# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('event', '0009_auto_20160205_0927'),
    ]

    operations = [
        migrations.CreateModel(
            name='EmailUsers',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('email_type', models.CharField(max_length=255, choices=[(b'CREATE EVENT', b'CREATE EVENT'), (b'GO TO EVENT', b'GO TO EVENT'), (b'NOT GOING TO EVENT', b'NOT GOING TO EVENT')])),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
