from django.contrib import admin
from authentication.models import User
from event.inlines import ActivityPlacesInline, TeamActivitiesInline, UserEventsInline, UserTeamsInline, \
    ActivityUsersInline, TeamUsersInline
from event.models import Place, Activity, Team, Event


class ActivityAdmin(admin.ModelAdmin):
    inlines = (ActivityPlacesInline, ActivityUsersInline)


class TeamAdmin(admin.ModelAdmin):
    inlines = (TeamActivitiesInline, TeamUsersInline)


class PlaceAdmin(admin.ModelAdmin):
    inlines = (ActivityPlacesInline,)


class UserAdmin(admin.ModelAdmin):
    inlines = (UserEventsInline, UserTeamsInline, ActivityUsersInline)


class EventAdmin(admin.ModelAdmin):
    inlines = (UserEventsInline, )


admin.site.register(Activity, ActivityAdmin)
admin.site.register(Place, PlaceAdmin)
admin.site.register(Team, TeamAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(User, UserAdmin)