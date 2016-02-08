# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0010_emailusers'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='emailusers',
            name='user',
        ),
        migrations.DeleteModel(
            name='Venues',
        ),
        migrations.DeleteModel(
            name='EmailUsers',
        ),
    ]
