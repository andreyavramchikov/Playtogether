# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0007_auto_20160128_1038'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eventusers',
            name='team',
            field=models.ForeignKey(blank=True, to='event.Team', null=True),
        ),
    ]
