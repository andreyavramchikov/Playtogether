from datetime import datetime
from django.http.response import HttpResponse

from django.views.generic.base import TemplateView, View
from rest_framework import generics, filters
from authentication.serializers import ActivitySerializer, EventUsersSerializer
from event.models import Place, Team, Event, City, Activity, Venues, EventUsers
from event.serializers import PlaceSerializer, TeamSerializer, EventSerializer, CitySerializer, EventCreateSerializer
from rest_framework import views

class LandingView(TemplateView):
    template_name = 'landing/index.html'


# oauth get info of user - https://api.vkontakte.ru/method/getProfiles?uid=10453474&access_token=6ff8250ff65b3dfa345f0860d6bb242274b93f4d383bad013ab6a0f52cfd38f1da3ee37c1c76f8618486b&fields=photo

class MainView(TemplateView):
    template_name = 'index.html'


class UpdateUserView(generics.UpdateAPIView):
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class PlaceListView(generics.ListCreateAPIView):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    paginate_by = 100


class TeamListView(generics.ListCreateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    paginate_by = 100


class EventListView(generics.ListCreateAPIView):
    queryset = Event.objects.all().select_related('activity')
    serializer_class = EventSerializer
    paginate_by = 100

    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('city', 'is_paid', 'activity__name')

    def get_queryset(self):
        queryset = super(EventListView, self).get_queryset()
        try:
            start_date = datetime.strptime(self.request.QUERY_PARAMS.get('start_date'), '%d-%m-%Y').date()
            queryset = queryset.filter(start_date__gt=start_date)
        except (ValueError, TypeError):
            pass
        try:
            selected_activity_ids = self.request.QUERY_PARAMS.get('selected_activity_ids').split(',')
            queryset = queryset.filter(activity__pk__in=selected_activity_ids)
        except(ValueError, TypeError, AttributeError):
            pass

        return queryset


class EventCreateView(generics.CreateAPIView):
    serializer_class = EventCreateSerializer


class CityListView(generics.ListCreateAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    paginate_by = 100


class ActivityListView(generics.ListCreateAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    paginate_by = 100


class EventUsersUpdate(views.APIView):

    def post(self, request, *args, **kwargs):
        event_id = request.DATA.get('event_id')
        user = request.user
        if event_id and user:
            EventUsers.objects.create(user=user, event_id=event_id)
        return Response({
            'status': 'Correct',
        }, status=status.HTTP_200_OK)






import requests
# class VkView(APIView):
#
#     # href="http://oauth.vk.com/authorize?client_id=5269479&redirect_uri=http://ec2-52-90-107-10.compute-1.amazonaws.com:8000/vklogin&response_type=code"
#     def get(self, request):
#         r = requests.get('http://oauth.vk.com/authorize?client_id=5269479&redirect_uri=http://ec2-52-90-107-10.compute-1.amazonaws.com:8000/vklogin&response_type=code')
#         print request
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions, viewsets, status, views, generics
class VkViewLogin(views.APIView):

    # href="http://oauth.vk.com/authorize?client_id=5269479&redirect_uri=http://ec2-52-90-107-10.compute-1.amazonaws.com:8000/vklogin&response_type=code"
    def get(self, request):
        code = request.QUERY_PARAMS.get('code')
        return Response({
                'code': code
            }, status=status.HTTP_200_OK)
