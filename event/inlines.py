from django.contrib import admin
from event.models import ActivityPlaces, TeamActivities, EventUsers, TeamUsers, ActivityUsers


class ActivityPlacesInline(admin.TabularInline):
    model = ActivityPlaces


class TeamActivitiesInline(admin.TabularInline):
    model = TeamActivities


class TeamUsersInline(admin.TabularInline):
    model = TeamUsers


class UserEventsInline(admin.TabularInline):
    model = EventUsers


class UserTeamsInline(admin.TabularInline):
    model = TeamUsers


class ActivityUsersInline(admin.TabularInline):
    model = ActivityUsers