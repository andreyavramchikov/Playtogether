from datetime import datetime

from django.views.generic.base import TemplateView
from rest_framework import generics, filters, status
from rest_framework.response import Response
from authentication.serializers import ActivitySerializer
from event.models import Place,Event, Activity, EventUsers, ActivityUsers
from event.serializers import PlaceSerializer, EventSerializer, EventCreateSerializer
from rest_framework import views

# from event.tasks import add, send_email
from mail.sender import EmailSender


class MainView(TemplateView):
    template_name = 'index.html'

    def get(self, request, *args, **kwargs):
        # add.delay(7, 8)
        return super(MainView, self).get(request, *args, **kwargs)


class UpdateUserView(generics.UpdateAPIView):
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class PlaceListView(generics.ListCreateAPIView):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    paginate_by = 100


class EventListView(generics.ListCreateAPIView):
    queryset = Event.objects.all().select_related('activity')
    serializer_class = EventSerializer
    page_size = 100
    page_size_query_param = 'page'
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('start_date',)
    ordering = ('-start_date',)

    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('id',)

    def get_queryset(self):
        # EmailSender().sending_rules()
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

    def create(self, request, *args, **kwargs):
        create = super(EventCreateView, self).create(request, *args, **kwargs)
        try:
            EmailSender().create_event(request.user, create.data['id'])
        except (AttributeError, KeyError):
            pass
        return create


class ActivityListView(generics.ListCreateAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    paginate_by = 100


class UpdateEventUsers(views.APIView):

    def post(self, request, *args, **kwargs):
        try:
            event_id = request.data['event_id']
            action = request.data['action']
            user_id = request.data['user_id']
        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if event_id and user_id:
            if action == 'create':
                EventUsers.objects.create(user_id=user_id, event_id=event_id)
                # send_email.delay(request.user.id, event_id)
            elif action == 'delete':
                EventUsers.objects.get(user_id=user_id, event_id=event_id).delete()
                EmailSender().ungo_to_event(request.user, event_id)
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserActivitiesUpdate(views.APIView):

    def post(self, request, *args, **kwargs):
        try:
            activities = request.data['activities']
        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        if activities:
            for activity in activities:
                try:
                    activity_user, created = ActivityUsers.objects.get_or_create(user=request.user, activity_id=activity['id'])
                    activity_user.level = activity['level']
                    activity_user.save()
                except KeyError:
                    Response(status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)
