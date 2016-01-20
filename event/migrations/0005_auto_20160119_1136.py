# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0004_venues'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='end_date',
            field=models.DateTimeField(null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='max_people',
            field=models.IntegerField(null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='place',
            field=models.ForeignKey(blank=True, to='event.Place', null=True),
        ),
    ]
