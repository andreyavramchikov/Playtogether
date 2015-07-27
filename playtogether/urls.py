from django.conf.urls import patterns, include, url
from django.contrib import admin
from authentication.views import AccountViewSet, LoginView, LogoutView, UserListView
from event.views import MainView, PlaceListView, TeamListView, EventListView
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from rest_framework import routers


router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)


urlpatterns = patterns('',
    url(r'^api/v1/', include(router.urls)),

    url(r'^admin/', include(admin.site.urls)),

    url(r'^$', MainView.as_view(), name='index'),

    #rewriting urls to avoid 404 when reload on this page
    #the view will invoked just when you first time go to /places or when you reload
    #and will not run when you just walking on the site
    url(r'^places/$', MainView.as_view(), name='index'),
    url(r'^teams/$', MainView.as_view(), name='index'),
    url(r'^events/$', MainView.as_view(), name='index'),
    url(r'^users/$', MainView.as_view(), name='index'),

    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),

    url(r'^api/v1/place/$', PlaceListView.as_view(), name='place-list'),
    url(r'^api/v1/team/$', TeamListView.as_view(), name='team-list'),
    url(r'^api/v1/event/$', EventListView.as_view(), name='event-list'),
    url(r'^api/v1/user/$', UserListView.as_view(), name='event-list'),

)

urlpatterns += staticfiles_urlpatterns()