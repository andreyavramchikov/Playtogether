from django.core.mail import send_mail
from django.core.mail.message import EmailMessage
from django.conf import settings
from django.template.loader import render_to_string

from authentication.models import User
from event.models import ActivityUsers
from mail.models import EmailUsers


class EmailSender(object):

    def __init__(self):
        pass

    def send_email(self, email_user):
        data = {'username': email_user.user.email}
        msg_html = render_to_string('emails/create_event.html', data)
        send_mail(
            'email title',
            'message',
            settings.EMAIL_HOST_USER,
            [email_user.user.email],
            html_message=msg_html,
        )
        email_user.sent = True
        email_user.save()

    def get_email_users(self):
        return EmailUsers.objects.filter(sent=False)

    def send_emails(self):
        for email_user in self.get_email_users()[0:2]:
            self.send_email(email_user)

    def create_event(self, user, event):
        EmailUsers.objects.create(email_type=EmailUsers.CREATE_EVENT, user=user, event=event)

    def sending_rules(self):
        email_users = self.get_email_users()
        for email_user in email_users:
            email_type = email_user.email_type
            user = email_user.user
            event = email_user.event
            if email_type == EmailUsers.CREATE_EVENT:
                # send to event creator one email and to subscribe mailng lis
                self.send_email(email_user)

                #get all users which subscribe to this event and by the event time
                subscribe_users = User.objects.filter(pk__in=ActivityUsers.objects.filter(activity__pk=event.activity.pk).
                                                      values_list('id', flat=True))

