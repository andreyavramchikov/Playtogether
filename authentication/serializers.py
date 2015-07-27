from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers
from authentication.models import User
from event.models import ActivityUsers, Activity


class ActivitySerializer(serializers.ModelSerializer):
    """
    Need to be refactored because duplicate same serializer from event app
    """
    class Meta:
        model = Activity


class ActivityUsersSerializer(serializers.ModelSerializer):

    activity = ActivitySerializer()

    class Meta:
        model = ActivityUsers
        fields = ('user', 'activity')


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)
    activity_users = ActivityUsersSerializer(source='activityusers_set', many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'city', 'notification_frequency',
                  'created_at', 'updated_at', 'first_name', 'last_name',
                  'password', 'activity_users', 'confirm_password',)
        read_only_fields = ('created_at', 'updated_at',)

        def create(self, validated_data):
            return User.objects.create(**validated_data)

        def update(self, instance, validated_data):
            instance.username = validated_data.get('username', instance.username)

            instance.save()

            password = validated_data.get('password', None)
            confirm_password = validated_data.get('confirm_password', None)

            if password and confirm_password and password == confirm_password:
                instance.set_password(password)
                instance.save()

            update_session_auth_hash(self.context.get('request'), instance)

            return instance

