# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0008_auto_20160204_0932'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='eventusers',
            unique_together=set([('event', 'user')]),
        ),
    ]
