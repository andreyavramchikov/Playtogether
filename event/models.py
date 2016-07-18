# -*- coding: utf-8 -*-

from django.db import models
from authentication.models import User


class Place(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()
    website = models.CharField(max_length=255, blank=True)
    email = models.EmailField(unique=True, blank=True)
    phone = models.IntegerField(null=True, blank=True)
    is_paid = models.BooleanField(default=False)

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = u'Место'
        verbose_name_plural = u'Места'


class Activity(models.Model):
    PAIR = u'ПАРНЫЙ'
    TEAM = u'КОМАНДНЫЙ'
    KIND_CHOICES = (
        (PAIR, u'ПАРНЫЙ'),
        (TEAM, u'КОМАНДНЫЙ'),
    )

    name = models.CharField(max_length=255, unique=True)
    kind = models.CharField(max_length=255, choices=KIND_CHOICES, default=TEAM)
    activity_places = models.ManyToManyField(Place, through='ActivityPlaces', through_fields=('activity', 'place'))
    activity_users = models.ManyToManyField(User, through='ActivityUsers')

    def __unicode__(self):
        return self.name

    class Meta:
        verbose_name = u'Активность'
        verbose_name_plural = u'Активности'


class ActivityPlaces(models.Model):
    activity = models.ForeignKey(Activity)
    place = models.ForeignKey(Place)

    def __unicode__(self):
        return u'Activity - {}; Place - {}'.format(self.activity, self.place)


class Event(models.Model):
    activity = models.ForeignKey(Activity)
    place = models.ForeignKey(Place, null=True, blank=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField(null=True, blank=True)
    min_people = models.IntegerField()
    max_people = models.IntegerField(null=True, blank=True)
    is_paid = models.BooleanField(default=False)
    cost = models.IntegerField(null=True, blank=True)
    description = models.TextField(blank=True)
    users = models.ManyToManyField(User, through='EventUsers')

    def __unicode__(self):
        return u'{} - {}'.format(self.activity.name, self.start_date)

    class Meta:
        verbose_name = u'Событие'
        verbose_name_plural = u'События'


class EventUsers(models.Model):
    event = models.ForeignKey(Event)
    user = models.ForeignKey(User)

    class Meta:
        unique_together = (("event", "user"),)

    def __unicode__(self):
        return u'Event - {}; User - {}'.format(self.event, self.user)


class ActivityUsers(models.Model):
    user = models.ForeignKey(User)
    activity = models.ForeignKey(Activity)
    level = models.CharField(max_length=255, blank=True)

    def __unicode__(self):
        return u'Activity - {}; User - {}'.format(self.activity, self.user)

    class Meta:
        unique_together = (('user', 'activity'),)
