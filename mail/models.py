from django.db import models

# Create your models here.
from authentication.models import User
from event.models import Event


class EmailUsers(models.Model):
    CREATE_EVENT = u'CREATE EVENT'
    GO_TO_EVENT = u'GO TO EVENT'
    UN_GO_EVENT = u'NOT GOING TO EVENT'
    EMAIL_TYPES = (
        (CREATE_EVENT, u'CREATE EVENT'),
        (GO_TO_EVENT, u'GO TO EVENT'),
        (UN_GO_EVENT, u'NOT GOING TO EVENT')
    )
    email_type = models.CharField(choices=EMAIL_TYPES, max_length=255)
    user = models.ForeignKey(User)
    event = models.ForeignKey(Event, null=True, blank=True)
    sent = models.BooleanField(default=False)