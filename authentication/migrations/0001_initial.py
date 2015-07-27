# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(null=True, verbose_name='last login', blank=True)),
                ('email', models.EmailField(unique=True, max_length=254)),
                ('username', models.CharField(unique=True, max_length=40)),
                ('first_name', models.CharField(max_length=40, blank=True)),
                ('last_name', models.CharField(max_length=40, blank=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('phone', models.IntegerField(null=True, blank=True)),
                ('sms_notification', models.BooleanField(default=False)),
                ('email_notification', models.BooleanField(default=False)),
                ('city', models.CharField(max_length=100, null=True, blank=True)),
                ('sex', models.CharField(max_length=100, null=True, blank=True)),
                ('date_of_birth', models.DateTimeField(null=True, blank=True)),
                ('notification_frequency', models.CharField(max_length=255, null=True, blank=True)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
