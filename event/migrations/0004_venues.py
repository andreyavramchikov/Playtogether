# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0003_auto_20150811_0806'),
    ]

    operations = [
        migrations.CreateModel(
            name='Venues',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('venue_name', models.CharField(max_length=255)),
            ],
        ),
    ]
