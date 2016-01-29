from datetime import datetime
from django.http.response import HttpResponse

from django.views.generic.base import TemplateView, View
from rest_framework import generics, filters
from rest_framework.views import APIView

from authentication.serializers import ActivitySerializer
from event.models import Place, Team, Event, City, Activity, Venues
from event.serializers import PlaceSerializer, TeamSerializer, EventSerializer, CitySerializer, EventCreateSerializer


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
            start_date = datetime.strptime(self.request.QUERY_PARAMS.get('start_date'), '%Y-%m-%d').date()
            queryset = queryset.filter(start_date__gt=start_date)
        except (ValueError, TypeError):
            start_date = None
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
