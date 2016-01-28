# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0006_auto_20160128_0839'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='send_sms',
            new_name='sms_notification',
        ),
    ]
