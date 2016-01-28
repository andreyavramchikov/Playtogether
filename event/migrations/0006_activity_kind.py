# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0005_auto_20160119_1136'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='kind',
            field=models.CharField(default=b'TEAM', max_length=255, choices=[(b'TEAM', b'COUPLE'), (b'TEAM', b'TEAM')]),
        ),
    ]
