# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from event.models import City

BELORUS_CITIES = ['Минск','Брест','Гродно',
                  'Гомель','Витебск','Могилёв',
                  'Бобруйск','Барановичи','Лида',
                  'Новополоцк','Пинск','Борисов',
                  'Мозырь','Полоцк','Орша',
                  'Молодечно','Солигорск','Жлобин',
                  'Светлогорск', 'Речица']



def populate_cities(apps, schema_editor):
    for city in BELORUS_CITIES:
        City.objects.get_or_create(name=city)

class Migration(migrations.Migration):

    dependencies = [
        ('event', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(populate_cities),
    ]
