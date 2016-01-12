from datetime import datetime
from urllib import addbase
from django.http.response import HttpResponse

from django.views.generic.base import TemplateView, View
from rest_framework import generics, filters

from authentication.serializers import ActivitySerializer
from event.models import Place, Team, Event, City, Activity, Venues
from event.serializers import PlaceSerializer, TeamSerializer, EventSerializer, CitySerializer, EventCreateSerializer
# from event.tasks import add
from playtogether.celery_sync import debug_task


class LandingView(TemplateView):
    template_name = 'landing/index.html'


class MainView(TemplateView):
    template_name = 'landing/index.html'

class TestView(TemplateView):
    template_name = 'test.html'

    # def get(self, request, *args, **kwargs):
    #     # add.delay(2, 2)
    #     debug_task.delay()
    #     context = self.get_context_data(**kwargs)
    #     return self.render_to_response(context)


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


import json


class PrepaimentView(View):

    def post(self, request, *args, **kwargs):
        print self.request.POST

    def put(self, request, *args, **kwargs):
        print self.request.POST

    def get(self, request, *args, **kwargs):
        list_ids =  self.request.GET.get('list')
        list_ids = list_ids.split(',')
        for id in list_ids:
            print id


class GetListVenue(View):

    def get(self, request, *args, **kwargs):
        venues = Venues.objects.all().values('pk', 'venue_name')
        return HttpResponse(json.dumps(list(venues)), content_type="application/json")



class GetListPrepaidVenues(View):

    def get(self, request, *args, **kwargs):
        venues = Venues.objects.all().values('pk', 'venue_name')[0:20]
        return HttpResponse(json.dumps(list(venues)), content_type="application/json")