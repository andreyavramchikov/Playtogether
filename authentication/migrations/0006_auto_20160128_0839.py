# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0005_auto_20160125_1346'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='notification_frequency',
        ),
        migrations.AddField(
            model_name='user',
            name='schedule_to_play',
            field=models.CharField(default=b'ALWAYS', max_length=255, blank=True, choices=[(b'ALWAYS', b'ALWAYS'), (b'WEEKDAY', b'WEEKDAY'), (b'WEEKEND', b'WEEKEND')]),
        ),
    ]
