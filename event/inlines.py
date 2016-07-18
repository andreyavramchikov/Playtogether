from django.contrib import admin
from event.models import ActivityPlaces, EventUsers, ActivityUsers


class ActivityPlacesInline(admin.TabularInline):
    model = ActivityPlaces

class UserEventsInline(admin.TabularInline):
    model = EventUsers


class ActivityUsersInline(admin.TabularInline):
    model = ActivityUsers