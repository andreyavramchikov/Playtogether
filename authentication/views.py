# -*- coding: utf-8 -*-

import json
import requests

from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import authenticate, login, logout
from django.template import loader
from django.utils.translation import ugettext_lazy as _
from django.shortcuts import redirect

from rest_framework import permissions, viewsets, status, views, generics
from rest_framework.response import Response


from authentication.models import User
from authentication.permissions import IsAccountOwner
from authentication.serializers import UserSerializer
from authentication.utils import _translate_dict
from mail.sender import EmailSender


class AccountViewSet(viewsets.ModelViewSet):
    lookup_field = 'pk'
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST' or self.request.method == 'PUT':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), IsAccountOwner(),)

    def update(self, request, *args, **kwargs):
        kwargs.update({'partial': True})
        return super(AccountViewSet, self).update(request, *args, **kwargs)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            user = User.objects.create_user(**serializer.validated_data)
            serializer.validated_data.update({'pk': user.pk})
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        # val = _(serializer.errors)
        return Response({
            'status': _('Bad request'),
            'message': _('Account could not be created with received data.'),
            'errors': _translate_dict(serializer.errors)
        }, status=status.HTTP_400_BAD_REQUEST)


class LoginView(views.APIView):

    def post(self, request, format=None):
        data = request.data
        email = data.get('email', None)
        password = data.get('password', None)

        account = authenticate(email=email, password=password)

        if account is not None:
            if account.is_active:
                login(request, account)

                serialized = UserSerializer(account)

                return Response(serialized.data)
            else:
                return Response({
                    'status': _('Unauthorized'),
                    'message': _('This account has been disabled.')
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': _('Unauthorized'),
                'message': _(u'Комбинация пароля и email не правильная.')
            }, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        logout(request)

        return Response({}, status=status.HTTP_204_NO_CONTENT)


class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    paginate_by = 100

    def get_queryset(self):
        queryset = super(UserListView, self).get_queryset()
        selected_activity_ids = self.request.query_params.get('selected_activity_ids')
        sex = self.request.query_params.get('sex')
        event_id = self.request.query_params.get('event_id')

        # get all users which still available to invite to Event
        if event_id:
            queryset = queryset.exclude(event__pk=event_id)

        if sex:
            queryset = queryset.filter(sex=sex)
        if selected_activity_ids:
            queryset = queryset.filter(activity__pk__in=selected_activity_ids.split(','))
        return queryset.distinct()


class ForgotPasswordView(views.APIView):

    def post(self, request, *args, **kwargs):
        email_template_name = 'emails/reset-password-email.html'
        email = request.data['email']
        try:
            user = User.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            data = {'email': email,
                    'domain': request.META['HTTP_HOST'],
                    'site_name': _('Playtogether'),
                    'uid': uid,
                    'token': token}
            email_msg = loader.render_to_string(email_template_name, data)
            EmailSender().send_forgot_password_email(email, email_msg)
            return Response(status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST,
                            data={'errors': {'email': 'No such email in system'}})


class ResetPasswordConfirmView(views.APIView):

    def post(self, request, *args, **kwargs):
        try:
            uidb64 = request.data['uidb64']
            token = request.data['token']
            password = request.data['password']
            confirm_password = request.data['confirm_password']
        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        uid = urlsafe_base64_decode(uidb64)
        user = User.objects.get(pk=uid)
        if user and default_token_generator.check_token(user, token):
            # MUST BE CHANGE TO VALIDATE BY FORM
            if password == confirm_password:
                user.set_password(confirm_password)
                user.save()
                return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class GetUserView(views.APIView):

    def get(self, request, *args, **kwargs):
        if not request.user.is_anonymous():
            serializer = UserSerializer(request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


# TODO - Should replace hardcoded data with settings parameters
class CallBackView(views.APIView):

    def get(self, request, *args, **kwargs):
        import requests
        code = request.query_params['code']
        response = requests.post('https://github.com/login/oauth/access_token',
                      {'client_id': '436adf1db1ea1a3b2936',
                       'client_secret': settings.GITHUB_SECRET_KEY,
                       'code': code})
        access_token = response.content.split('&')[0].split('=')[1]
        info = requests.get('https://api.github.com/user?access_token=' + access_token)
        print json.loads(info.content)['avatar_url']
        print json.loads(info.content)['login']
        return Response(status=status.HTTP_200_OK)


# TODO - Should replace hardcoded data with settings parameters
class CallBackVKView(views.APIView):

    def get(self, request, *args, **kwargs):
        code = request.query_params['code']
        URL = 'https://oauth.vk.com/access_token?client_id=5269479&redirect_uri=' \
              'http://localhost:9000/callbackvk&client_secret={}&code={}'.format(settings.VK_SECRET_KEY, code)
        response = requests.get(URL)
        access_token = json.loads(response.content)['access_token']
        user_id = json.loads(response.content)['user_id']
        email = json.loads(response.content)['email']
        password = 'oauthpassword'
        try:
            User.objects.create_user(email=email, password=password)
            account = authenticate(email=email, password=password)
        except IntegrityError:
            account = authenticate(email=email, password=password)

        if account.is_active:
            login(request, account)

        response = requests.get('https://api.vkontakte.ru/method/getProfiles?'
                                'uid={}&access_token={}&fields=photo,sex,email'.format(user_id, access_token))

        print json.loads(response.content)['response'][0]['photo']

        return redirect('/')
