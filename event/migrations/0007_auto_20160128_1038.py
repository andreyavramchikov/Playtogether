# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0006_activity_kind'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='kind',
            field=models.CharField(default=b'TEAM', max_length=255, choices=[(b'PAIR', b'PAIR'), (b'TEAM', b'TEAM')]),
        ),
    ]
