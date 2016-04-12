from rest_framework import serializers
from authentication.models import User
from event.models import Place, Event, Activity, EventUsers


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


class EventPlaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Place
        fields = ('name', 'city')
        read_only_fields = ('name', 'city')


class EventSerializer(serializers.ModelSerializer):
    activity = ActivitySerializer(read_only=True, required=False)
    place = EventPlaceSerializer(read_only=True)
    event_users = serializers.SerializerMethodField(read_only=True)
    count_of_members = serializers.SerializerMethodField(read_only=True)
    remaining_spots = serializers.SerializerMethodField(read_only=True)

    """
    BAD Example of serializing ManyToMany model - need to be refactored
    """
    def get_event_users(self, instance):
        event_user_ids = instance.eventusers_set.filter(event=instance).values_list('user', flat=True)
        return User.objects.filter(pk__in=event_user_ids).values_list('id', flat=True)

    def get_count_of_members(self, instance):
        return EventUsers.objects.filter(event_id=instance.id).count()

    def get_remaining_spots(self, instance):
        return instance.min_people - self.get_count_of_members(instance)

    class Meta:
        model = Event
        fields = ('id', 'activity', 'place', 'start_date',
                  'end_date', 'min_people', 'max_people',
                  'is_paid', 'cost', 'description', 'event_users', 'count_of_members', 'remaining_spots')


#NEED TO THINK HOW TO COMBINE THIS CLASS WITH EventSerializer
class EventCreateSerializer(serializers.ModelSerializer):
    start_date = serializers.DateTimeField(input_formats=['%d-%m-%Y %H:%M'])
    end_date = serializers.DateTimeField(input_formats=['%d-%m-%Y %H:%M'], required=False)

    class Meta:
        model = Event








