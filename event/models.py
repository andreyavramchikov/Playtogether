from django.db import models
from authentication.models import User


class City(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __unicode__(self):
        return self.name


class Place(models.Model):
    name = models.CharField(max_length=255)
    city = models.ForeignKey(City)
    address = models.TextField()
    website = models.CharField(max_length=255, blank=True)
    email = models.EmailField(unique=True, blank=True)
    phone = models.IntegerField(null=True, blank=True)
    is_paid = models.BooleanField(default=False)

    def __unicode__(self):
        return self.name


class Activity(models.Model):
    PAIR = 'PAIR'
    TEAM = 'TEAM'
    KIND_CHOICES = (
        (PAIR, 'PAIR'),
        (TEAM, 'TEAM'),
    )

    name = models.CharField(max_length=255, unique=True)
    kind = models.CharField(max_length=255, choices=KIND_CHOICES, default=TEAM)
    activity_places = models.ManyToManyField(Place, through='ActivityPlaces', through_fields=('activity', 'place'))
    activity_users = models.ManyToManyField(User, through='ActivityUsers')

    def __unicode__(self):
        return self.name


class ActivityPlaces(models.Model):
    activity = models.ForeignKey(Activity)
    place = models.ForeignKey(Place)

    def __unicode__(self):
        return 'Activity - {}; Place - {}'.format(self.activity, self.place)


class Team(models.Model):
    OPENED = 'NEW'
    CLOSED = 'MIDDLE'
    TYPE_CHOICES = (
        (OPENED, 'OPENED'),
        (CLOSED, 'CLOSED'),
    )
    name = models.CharField(max_length=255)
    city = models.ForeignKey(City, null=True, blank=True)
    type = models.CharField(max_length=255, choices=TYPE_CHOICES, default=OPENED)
    max_people = models.IntegerField(null=True, blank=True)
    is_captain = models.BooleanField(default=False)
    team_users = models.ManyToManyField(User, through='TeamUsers')
    team_activities = models.ManyToManyField(Activity, through='TeamActivities', through_fields=('team', 'activity'))

    def __unicode__(self):
        return self.name


class TeamActivities(models.Model):
    NEW = 'NEW'
    MIDDLE = 'MIDDLE'
    ADVANCED = 'ADVANCED'
    TEAM_LEVEL_CHOICES = (
        (NEW, 'NEW'),
        (MIDDLE, 'MIDDLE'),
        (ADVANCED, 'ADVANCED'),
    )
    activity = models.ForeignKey(Activity)
    team = models.ForeignKey(Team)
    level = models.CharField(max_length=255, blank=True, choices=TEAM_LEVEL_CHOICES, default=NEW)

    def __unicode__(self):
        return 'Team - {}; Activity - {}'.format(self.team, self.activity)


class Event(models.Model):
    activity = models.ForeignKey(Activity)
    place = models.ForeignKey(Place, null=True, blank=True)
    city = models.ForeignKey(City, null=True, blank=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField(null=True, blank=True)
    min_people = models.IntegerField()
    max_people = models.IntegerField(null=True, blank=True)
    is_paid = models.BooleanField(default=False)
    cost = models.IntegerField(null=True, blank=True)
    description = models.TextField(blank=True)
    users = models.ManyToManyField(User, through='EventUsers')

    def __unicode__(self):
        return '{} - {}'.format(self.activity.name, self.start_date)


class EventUsers(models.Model):
    event = models.ForeignKey(Event)
    user = models.ForeignKey(User)
    team = models.ForeignKey(Team, null=True, blank=True)

    class Meta:
        unique_together = (("event", "user"),)

    def __unicode__(self):
        return 'Event - {}; User - {}'.format(self.event, self.user)


class TeamUsers(models.Model):
    team = models.ForeignKey(Team)
    user = models.ForeignKey(User)

    def __unicode__(self):
        return 'Team - {}; User - {}'.format(self.team, self.user)


class ActivityUsers(models.Model):
    NEW = 'NEW'
    MIDDLE = 'MIDDLE'
    ADVANCED = 'ADVANCED'
    LEVEL_CHOICES = (
        (NEW, 'NEW'),
        (MIDDLE, 'MIDDLE'),
        (ADVANCED, 'ADVANCED'),
    )
    user = models.ForeignKey(User)
    activity = models.ForeignKey(Activity)
    level = models.CharField(max_length=255, blank=True, choices=LEVEL_CHOICES, default=NEW)

    def __unicode__(self):
        return 'Activity - {}; User - {}'.format(self.activity, self.user)
