# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0011_auto_20160208_1128'),
        ('mail', '0002_emailusers_sent'),
    ]

    operations = [
        migrations.AddField(
            model_name='emailusers',
            name='event',
            field=models.ForeignKey(blank=True, to='event.Event', null=True),
        ),
    ]
