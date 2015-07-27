# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Activity',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='ActivityPlaces',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('activity', models.ForeignKey(to='event.Activity')),
            ],
        ),
        migrations.CreateModel(
            name='ActivityUsers',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('level', models.CharField(default=b'NEW', max_length=255, blank=True, choices=[(b'NEW', b'NEW'), (b'MIDDLE', b'MIDDLE'), (b'ADVANCED', b'ADVANCED')])),
                ('activity', models.ForeignKey(to='event.Activity')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(unique=True, max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('city', models.CharField(max_length=255, null=True, blank=True)),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField()),
                ('min_people', models.IntegerField()),
                ('max_people', models.IntegerField()),
                ('is_paid', models.BooleanField()),
                ('cost', models.IntegerField(null=True, blank=True)),
                ('description', models.TextField(blank=True)),
                ('activity', models.ForeignKey(to='event.Activity')),
            ],
        ),
        migrations.CreateModel(
            name='EventUsers',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('event', models.ForeignKey(to='event.Event')),
            ],
        ),
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('city', models.CharField(max_length=50)),
                ('address', models.TextField()),
                ('website', models.CharField(max_length=255, blank=True)),
                ('email', models.EmailField(unique=True, max_length=254, blank=True)),
                ('phone', models.IntegerField(null=True, blank=True)),
                ('is_paid', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255)),
                ('city', models.CharField(max_length=50)),
                ('type', models.CharField(default=b'NEW', max_length=255, choices=[(b'NEW', b'OPENED'), (b'MIDDLE', b'CLOSED')])),
                ('max_people', models.IntegerField(null=True, blank=True)),
                ('is_captain', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='TeamActivities',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('level', models.CharField(default=b'NEW', max_length=255, blank=True, choices=[(b'NEW', b'NEW'), (b'MIDDLE', b'MIDDLE'), (b'ADVANCED', b'ADVANCED')])),
                ('activity', models.ForeignKey(to='event.Activity')),
                ('team', models.ForeignKey(to='event.Team')),
            ],
        ),
        migrations.CreateModel(
            name='TeamUsers',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('team', models.ForeignKey(to='event.Team')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='team',
            name='team_activities',
            field=models.ManyToManyField(to='event.Activity', through='event.TeamActivities'),
        ),
        migrations.AddField(
            model_name='team',
            name='team_users',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL, through='event.TeamUsers'),
        ),
        migrations.AddField(
            model_name='eventusers',
            name='team',
            field=models.ForeignKey(to='event.Team'),
        ),
        migrations.AddField(
            model_name='eventusers',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='event',
            name='place',
            field=models.ForeignKey(to='event.Place'),
        ),
        migrations.AddField(
            model_name='event',
            name='users',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL, through='event.EventUsers'),
        ),
        migrations.AddField(
            model_name='activityplaces',
            name='place',
            field=models.ForeignKey(to='event.Place'),
        ),
        migrations.AddField(
            model_name='activity',
            name='activity_places',
            field=models.ManyToManyField(to='event.Place', through='event.ActivityPlaces'),
        ),
        migrations.AddField(
            model_name='activity',
            name='activity_users',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL, through='event.ActivityUsers'),
        ),
    ]
