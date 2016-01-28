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


# hack for temporary use
# class ActivitySerializerTmp(serializers.ModelSerializer):
#     class Meta:
#         model = Activity
#         fields = ('id',)
#
# class UserSerializerTmp(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ('id',)
#
# class ActivityUsersSerializerTmp(serializers.ModelSerializer):
#     activity = ActivitySerializerTmp()
#     user = UserSerializerTmp()
#     class Meta:
#         model = ActivityUsers
#         fields = ('user', 'activity')


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    phone = serializers.IntegerField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)
    activity_users = ActivityUsersSerializer(source='activityusers_set', many=True, read_only=True)

    # invoke just if data correct
    def validate(self, data):
        sms_notification = data.get('sms_notification')
        phone = data.get('phone')
        if sms_notification:
            # if user checked send_sms checkbox then user MUST fill the phone field
            if not phone:
                raise serializers.ValidationError('Phone should be presented if you check sendSMS checkbox')
            if not self.validate_phone(data.get('phone')):
                raise serializers.ValidationError('Phone not valid')

        return data

    def validate_phone(self, phone):
        return phone

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'city', 'schedule_to_play',
                  'created_at', 'updated_at', 'first_name', 'last_name',
                  'password', 'activity_users', 'confirm_password', 'phone', 'sms_notification', 'sex', 'date_of_birth')
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

    # def validate_phone(self, data):
    #     print data
    #
    # # need to think about it
    # def is_valid(self):
    #     super(UserSerializer, self).is_valid()
