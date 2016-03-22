from django.contrib import admin
from authentication.models import User
from event.inlines import ActivityPlacesInline, UserEventsInline, ActivityUsersInline
from event.models import Place, Activity, Event


class ActivityAdmin(admin.ModelAdmin):
    inlines = (ActivityPlacesInline, ActivityUsersInline)



class PlaceAdmin(admin.ModelAdmin):
    inlines = (ActivityPlacesInline,)


class UserAdmin(admin.ModelAdmin):

    list_display = ('email', 'phone', 'sex', 'sms_notification', 'email_notification', 'schedule_to_play', )
    list_filter = ('sms_notification',)

    inlines = (UserEventsInline, ActivityUsersInline)
    save_as = True


class EventAdmin(admin.ModelAdmin):
    inlines = (UserEventsInline, )


admin.site.register(Activity, ActivityAdmin)
admin.site.register(Place, PlaceAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(User, UserAdmin)