# -*- coding: utf-8 -*-

from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from authentication.models import User
from event.models import Activity, Event


class AccountTests(APITestCase):

    def test_urls_200(self):
        urls = ('index', 'event-list', 'user-list', 'activity-list')
        for url in urls:
            url = reverse(url)
            response = self.client.get(url)
            self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_event(self):
        url = reverse('event-create')
        activity = Activity.objects.create(name='Football', kind=Activity.TEAM)
        data = {'min_people': 1, 'start_date': '17-03-2016 11:20', 'activity': activity.pk}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_event_users(self):
        url = reverse('update-event-users')
        event = Event.objects.all().first()
        if not event:
            self.test_create_event()
            event = Event.objects.all().first()

        user = User.objects.create(email='email@email.com', password='12345')
        data = {'event_id': event.id, 'user_id': user.id, 'action': 'create'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        data = {'event_id': event.id, 'user_id': user.id, 'action': 'delete'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_register_user(self, email=None, password=None):
        email = 'admin@admin.com' if email is None else email
        password = 'admin' if password is None else password
        url = '/api/v1/accounts/'
        data = {'email': email, 'password': password}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_login_user(self):
        email = 'admin@admin.com'
        password = 'admin'
        self.test_register_user(email=email, password=password)
        url = reverse('login')
        data = {'email': email, 'password': password}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

