from rest_framework import serializers
from authentication.models import User
from authentication.serializers import UserSerializer
from event.models import Place, Team, Event, Activity, EventUsers, TeamActivities, TeamUsers, City


class CitySerializer(serializers.ModelSerializer):

    class Meta:
        model = City


class ActivitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Activity
        fields = ('id', 'name')
        read_only_fields = ('name',)


class PlaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Place
        fields = ('id', 'name', 'city', 'address',
                  'website', 'email', 'phone', 'is_paid')


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


class EventPlaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Place
        fields = ('name', 'city')
        read_only_fields = ('name', 'city')


class EventSerializer(serializers.ModelSerializer):
    activity = ActivitySerializer(read_only=True, required=False)
    place = EventPlaceSerializer(read_only=True)
    event_users = serializers.SerializerMethodField(read_only=True)
    city = CitySerializer(required=False)
    count_of_members = serializers.SerializerMethodField(read_only=True)

    """
    BAD Example of serializing ManyToMany model - need to be refactored
    """
    def get_event_users(self, instance):
        event_user_ids = EventUsers.objects.filter(event=instance).values_list('user', flat=True)
        return User.objects.filter(pk__in=event_user_ids).values_list('id', flat=True)

    def get_count_of_members(self, instance):
        return EventUsers.objects.filter(event_id=instance.id).count()

    class Meta:
        model = Event
        fields = ('id', 'activity', 'place', 'city', 'start_date',
                  'end_date', 'min_people', 'max_people',
                  'is_paid', 'cost', 'description', 'event_users', 'count_of_members')


#NEED TO THINK HOW TO COMBINE THIS CLASS WITH EventSerializer
class EventCreateSerializer(serializers.ModelSerializer):
    start_date = serializers.DateTimeField(input_formats=['%d-%m-%Y %H:%M'])
    end_date = serializers.DateTimeField(input_formats=['%d-%m-%Y %H:%M'], required=False)

    class Meta:
        model = Event








