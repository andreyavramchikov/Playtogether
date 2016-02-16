# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-02-16 14:05
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0008_auto_20160204_0932'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='schedule_to_play',
            field=models.CharField(blank=True, choices=[(b'\xd0\x92\xd0\xa1\xd0\x95\xd0\x93\xd0\x94\xd0\x90', b'\xd0\x92\xd0\xa1\xd0\x95\xd0\x93\xd0\x94\xd0\x90'), (b'\xd0\x91\xd0\xa3\xd0\x94\xd0\x9d\xd0\x98', b'\xd0\x91\xd0\xa3\xd0\x94\xd0\x9d\xd0\x98'), (b'\xd0\x92\xd0\xab\xd0\xa5\xd0\x9e\xd0\x94\xd0\x9d\xd0\xab\xd0\x95', b'\xd0\x92\xd0\xab\xd0\xa5\xd0\x9e\xd0\x94\xd0\x9d\xd0\xab\xd0\x95')], default=b'\xd0\x92\xd0\xa1\xd0\x95\xd0\x93\xd0\x94\xd0\x90', max_length=255),
        ),
        migrations.AlterField(
            model_name='user',
            name='sex',
            field=models.CharField(blank=True, choices=[(b'\xd0\x9c\xd0\xa3\xd0\x96\xd0\xa1\xd0\x9a\xd0\x9e\xd0\x99', b'\xd0\x9c\xd0\xa3\xd0\x96\xd0\xa1\xd0\x9a\xd0\x9e\xd0\x99'), (b'\xd0\x96\xd0\x95\xd0\x9d\xd0\xa1\xd0\x9a\xd0\x98\xd0\x99', b'\xd0\x96\xd0\x95\xd0\x9d\xd0\xa1\xd0\x9a\xd0\x98\xd0\x99')], max_length=100, null=True),
        ),
    ]
