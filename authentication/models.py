from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager
from django.db import models


class AccountManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError('Users must have a valid email address.')

        account = self.model(email=self.normalize_email(email))

        account.set_password(password)
        account.save()

        return account

    def create_superuser(self, email, password, **kwargs):
        account = self.create_user(email, password, **kwargs)

        account.is_admin = True
        account.save()

        return account


class User(AbstractBaseUser):
    ALWAYS = 'ALWAYS'
    WEEKDAY = 'WEEKDAY'
    WEEKEND = 'WEEKEND'
    FREQUENCY_CHOICES = (
        (ALWAYS, 'ALWAYS'),
        (WEEKDAY, 'WEEKDAY'),
        (WEEKEND, 'WEEKEND'),
    )
    MALE = 'MALE'
    FEMALE = 'FEMALE'
    SEX_CHOICES = (
        (MALE, 'MALE'),
        (FEMALE, 'FEMALE'),
    )

    email = models.EmailField(unique=True)
    username = models.CharField(max_length=40, blank=True)

    first_name = models.CharField(max_length=40, blank=True)
    last_name = models.CharField(max_length=40, blank=True)

    is_admin = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    #custom fields
    phone = models.IntegerField(null=True, blank=True)
    sms_notification = models.BooleanField(default=False)
    email_notification = models.BooleanField(default=False)
    city = models.CharField(max_length=100, null=True, blank=True)
    sex = models.CharField(max_length=100, null=True, blank=True, choices=SEX_CHOICES)
    date_of_birth = models.DateField(null=True, blank=True)
    schedule_to_play = models.CharField(max_length=255, choices=FREQUENCY_CHOICES, default=ALWAYS, blank=True)

    objects = AccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def get_full_name(self):
        return ' '.join([self.first_name, self.last_name])

    def get_short_name(self):
        return self.first_name

    @property
    def is_staff(self):
        return self.is_admin

    def has_module_perms(self, app_label):
        return self.is_admin

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def __unicode__(self):
        return self.email

