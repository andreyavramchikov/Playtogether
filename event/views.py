from django.views.generic.base import TemplateView
from rest_framework import generics
from event.models import Place, Team, Event
from event.serializers import PlaceSerializer, TeamSerializer, EventSerializer


class MainView(TemplateView):
    template_name = 'index.html'

    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        return self.render_to_response(context)


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