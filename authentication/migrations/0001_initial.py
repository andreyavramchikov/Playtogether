# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-03-17 11:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('username', models.CharField(blank=True, max_length=40)),
                ('first_name', models.CharField(blank=True, max_length=40)),
                ('last_name', models.CharField(blank=True, max_length=40)),
                ('is_admin', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('phone', models.IntegerField(blank=True, null=True)),
                ('sms_notification', models.BooleanField(default=False)),
                ('email_notification', models.BooleanField(default=False)),
                ('city', models.CharField(blank=True, max_length=100, null=True)),
                ('sex', models.CharField(blank=True, choices=[('\u041c\u0423\u0416\u0421\u041a\u041e\u0419', '\u041c\u0423\u0416\u0421\u041a\u041e\u0419'), ('\u0416\u0415\u041d\u0421\u041a\u0418\u0419', '\u0416\u0415\u041d\u0421\u041a\u0418\u0419')], max_length=100, null=True)),
                ('date_of_birth', models.DateField(blank=True, null=True)),
                ('schedule_to_play', models.CharField(blank=True, choices=[('\u0412\u0421\u0415\u0413\u0414\u0410', '\u0412\u0421\u0415\u0413\u0414\u0410'), ('\u0411\u0423\u0414\u041d\u0418', '\u0411\u0423\u0414\u041d\u0418'), ('\u0412\u042b\u0425\u041e\u0414\u041d\u042b\u0415', '\u0412\u042b\u0425\u041e\u0414\u041d\u042b\u0415')], default='\u0412\u0421\u0415\u0413\u0414\u0410', max_length=255)),
            ],
            options={
                'verbose_name': '\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c',
                'verbose_name_plural': '\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438',
            },
        ),
    ]
