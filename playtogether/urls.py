from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.views.generic.base import RedirectView
from rest_framework import routers


from authentication.views import AccountViewSet, LoginView, LogoutView, UserListView, GetUserView, CallBackView, \
    CallBackVKView, ForgotPasswordView, ResetPasswordConfirmView
from event.views import MainView, EventListView, ActivityListView,\
    EventCreateView, UpdateEventUsers, UserActivitiesUpdate


router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)


urlpatterns = patterns('',
    url(r'^api/v1/', include(router.urls), name='accounts'),
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),

    url(r'^api/v1/event$', EventListView.as_view(), name='event-list'),
    url(r'^api/v1/user$', UserListView.as_view(), name='user-list'),
    url(r'^api/v1/activity$', ActivityListView.as_view(), name='activity-list'),

    url(r'^api/v1/event/create/$', EventCreateView.as_view(), name='event-create'),
    url(r'^api/v1/update/eventusers/$', UpdateEventUsers.as_view(), name='update-event-users'),

    url(r'^api/v1/update/useractivities/$', UserActivitiesUpdate.as_view(), name='update-users-activities'),
    url(r'^api/v1/forgot_password/$', ForgotPasswordView.as_view(), name='forgot-password'),

    url(r'^api/v1/account/reset_password_confirm/(?P<uidb64>[0-9A-Za-z]+);(?P<token>.+)/$',
        MainView.as_view(), name='reset_password_confirm'),
    url(r'^api/v1/reset-confirm/$', ResetPasswordConfirmView.as_view(), name='reset-confirm-api'),
    url(r'^api/v1/getuser/$', GetUserView.as_view(), name='get-user'),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    url(r'^$', RedirectView.as_view(url='/landing'), name='index'),
    url(r'^landing/$', MainView.as_view(), name='landing'),
    url(r'^home/$', MainView.as_view(), name='index'),

    url(r'^places/$', MainView.as_view(), name='index'),
    url(r'^teams/$', MainView.as_view(), name='index'),
    url(r'^events/$', MainView.as_view(), name='index'),
    url(r'^event/(?P<id>[0-9]+)/$', MainView.as_view(), name='index'),
    url(r'^users/$', MainView.as_view(), name='index'),
    url(r'^profile/$', MainView.as_view(), name='index'),
    url(r'^createevent/$', MainView.as_view(), name='index'),
    url(r'^users/(?P<id>[0-9]+)/$', MainView.as_view(), name='index'),
    url(r'^register/step-1/$', MainView.as_view(), name='index'),
    url(r'^register/step-4/$', MainView.as_view(), name='index'),
    url(r'^register/step-3/$', MainView.as_view(), name='index'),
    url(r'^forgot_password/$', MainView.as_view(), name='index'),
    url(r'^login/$', MainView.as_view(), name='index'),

    url(r'^callback/$', CallBackView.as_view(), name='callback'),
    url(r'^callbackvk/$', CallBackVKView.as_view(), name='callbackvk'),

)

urlpatterns += staticfiles_urlpatterns()