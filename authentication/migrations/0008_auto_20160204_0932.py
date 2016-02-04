# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0007_auto_20160128_1224'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='sex',
            field=models.CharField(blank=True, max_length=100, null=True, choices=[(b'MALE', b'MALE'), (b'FEMALE', b'FEMALE')]),
        ),
    ]
