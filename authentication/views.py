import json

from rest_framework import permissions, viewsets, status, views, generics
from rest_framework.response import Response

from authentication.models import User
from authentication.permissions import IsAccountOwner
from authentication.serializers import UserSerializer

from django.contrib.auth import authenticate, login, logout


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

        return Response({
            'status': 'Bad request',
            'message': 'Account could not be created with received data.',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class LoginView(views.APIView):

    def post(self, request, format=None):
        data = json.loads(request.body)

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
                    'status': 'Unauthorized',
                    'message': 'This account has been disabled.'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username/password combination invalid.'
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

        if sex:
            queryset = queryset.filter(sex=sex)
        if selected_activity_ids:
            queryset = queryset.filter(activity__pk__in=selected_activity_ids.split(','))
        return queryset