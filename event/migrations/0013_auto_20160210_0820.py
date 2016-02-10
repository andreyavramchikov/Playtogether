# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0012_auto_20160209_1222'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='activityusers',
            unique_together=set([('user', 'activity')]),
        ),
    ]
