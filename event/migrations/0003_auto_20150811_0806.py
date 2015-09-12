# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0002_auto_20150728_0953'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='is_paid',
            field=models.BooleanField(default=False),
        ),
    ]
