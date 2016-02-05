from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.views.generic.base import RedirectView
from authentication.views import AccountViewSet, LoginView, LogoutView, UserListView
from event.views import MainView, PlaceListView, TeamListView, EventListView, CityListView, ActivityListView,\
    EventCreateView, LandingView, EventUsersUpdate
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from rest_framework import routers


router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)


urlpatterns = patterns('',
    url(r'^api/v1/', include(router.urls)),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', RedirectView.as_view(url='/landing'), name='index'),

    url(r'^landing/$', LandingView.as_view(), name='landing'),
    url(r'^home/$', MainView.as_view(), name='index'),

    url(r'^places/$', MainView.as_view(), name='index'),
    url(r'^teams/$', MainView.as_view(), name='index'),
    url(r'^events/$', MainView.as_view(), name='index'),
    url(r'^users/$', MainView.as_view(), name='index'),

    url(r'^createevent/$', MainView.as_view(), name='index'),
    url(r'^register/step-1/$', MainView.as_view(), name='index'),
    url(r'^register/step-2/$', MainView.as_view(), name='index'),
    url(r'^register/step-2/(?P<id>[0-9]+)$', MainView.as_view(), name='index'),
    url(r'^register/step-3/$', MainView.as_view(), name='index'),
    url(r'^register/step-4/$', MainView.as_view(), name='index'),
    url(r'^register/step-5/$', MainView.as_view(), name='index'),
    url(r'^login/$', MainView.as_view(), name='index'),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
    url(r'^api/v1/place$', PlaceListView.as_view(), name='place-list'),
    url(r'^api/v1/team$', TeamListView.as_view(), name='team-list'),
    url(r'^api/v1/event$', EventListView.as_view(), name='event-list'),
    url(r'^api/v1/event/create$', EventCreateView.as_view(), name='event-create'),
    url(r'^api/v1/user$', UserListView.as_view(), name='event-list'),
    url(r'^api/v1/city$', CityListView.as_view(), name='city-list'),
    url(r'^api/v1/activity$', ActivityListView.as_view(), name='activity-list'),
    url(r'^api/v1/updateeventusers$', EventUsersUpdate.as_view(), name='update-users-event'),
)

urlpatterns += staticfiles_urlpatterns()