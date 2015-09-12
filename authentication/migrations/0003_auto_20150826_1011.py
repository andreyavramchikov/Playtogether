# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_auto_20150806_0749'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='notification_frequency',
            field=models.CharField(default=b'ALWAYS', max_length=255, blank=True, choices=[(b'ALWAYS', b'ALWAYS'), (b'WORKING_DAYS', b'WORKING_DAYS'), (b'WEEKEND', b'WEEKEND')]),
        ),
    ]
