from rest_framework import serializers
from authentication.models import User
from authentication.serializers import UserSerializer
from event.models import Place, Team, Event, Activity, EventUsers, TeamActivities, TeamUsers, ActivityUsers


class ActivitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Activity


class PlaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Place


class TeamActivitiesSerializer(serializers.ModelSerializer):
    activity = ActivitySerializer()

    class Meta:
        model = TeamActivities
        fields = ('activity', 'team', 'level')


class TeamUsersSerializer(serializers.ModelSerializer):

    user = UserSerializer()

    class Meta:
        model = TeamUsers
        fields = ('team', 'user')


class TeamSerializer(serializers.ModelSerializer):

    """
    Example of serializing ManyToMany model
    """
    team_activities = TeamActivitiesSerializer(source='teamactivities_set', many=True)
    team_users = TeamUsersSerializer(source='teamusers_set', many=True)

    class Meta:
        model = Team
        fields = ('team_activities', 'team_users', 'name', 'city', 'type')


class EventSerializer(serializers.ModelSerializer):
    activity = ActivitySerializer()
    place = PlaceSerializer()
    event_users = serializers.SerializerMethodField()

    """
    BAD Example of serializing ManyToMany model - need to be refactored
    """
    def get_event_users(self, instance):
        event_user_ids = EventUsers.objects.filter(event=instance).values_list('user', flat=True)
        return User.objects.filter(pk__in=event_user_ids).values_list('id', flat=True)

    class Meta:
        model = Event
        fields = ('activity', 'place', 'city', 'start_date',
                  'end_date', 'min_people','max_people',
                  'is_paid', 'cost', 'description', 'event_users')


