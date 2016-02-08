from datetime import datetime

from django.views.generic.base import TemplateView
from rest_framework import generics, filters, status
from rest_framework.response import Response
from authentication.serializers import ActivitySerializer
from event.models import Place, Team, Event, City, Activity, EventUsers
from event.serializers import PlaceSerializer, TeamSerializer, EventSerializer, CitySerializer, EventCreateSerializer
from rest_framework import views

from mail.sender import EmailSender


class LandingView(TemplateView):
    template_name = 'landing/index.html'


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
            start_date = datetime.strptime(self.request.query_params.get('start_date'), '%d-%m-%Y').date()
            queryset = queryset.filter(start_date__gt=start_date)
        except (ValueError, TypeError):
            pass
        try:
            selected_activity_ids = self.request.query_params.get('selected_activity_ids').split(',')
            queryset = queryset.filter(activity__pk__in=selected_activity_ids)
        except(ValueError, TypeError, AttributeError):
            pass

        return queryset


class EventCreateView(generics.CreateAPIView):
    serializer_class = EventCreateSerializer

    def post(self, request, *args, **kwargs):
        create = super(EventCreateView, self).post(request, *args, **kwargs)
        EmailSender().create_event(request.user)
        # EmailSender().send_emails()
        return create


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
        try:
            event_id = request.DATA['event_id']
            action = request.DATA['action']
        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        user = request.user
        if event_id and user:
            if action == 'create':
                EventUsers.objects.create(user=user, event_id=event_id)
            elif action == 'delete':
                EventUsers.objects.get(user=user, event_id=event_id).delete()
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)

