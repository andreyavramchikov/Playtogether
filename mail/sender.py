from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string

from authentication.models import User
from event.models import ActivityUsers
from mail.models import EmailUsers


class EmailSender(object):

    def __init__(self):
        pass

    @staticmethod
    def send_forgot_password_email(email, email_msg):

        send_mail(
            u'Forgot your password?',
            email_msg,
            settings.EMAIL_HOST_USER,
            [email],
        )

    @staticmethod
    def send_email_template(email):
        data = {'username': email}
        msg_html = render_to_string('emails/create-event.html', data)
        send_mail(
            'email title',
            'message',
            settings.EMAIL_HOST_USER,
            [email],
            html_message=msg_html,
        )

    @staticmethod
    def send_email(email_user):
        data = {'username': email_user.user.email}
        msg_html = render_to_string('emails/create-event.html', data)
        send_mail(
            'email title',
            'message',
            settings.EMAIL_HOST_USER,
            [email_user.user.email],
            html_message=msg_html,
        )
        email_user.sent = True
        email_user.save()

    @staticmethod
    def get_email_users():
        return EmailUsers.objects.filter(sent=False)

    def send_emails(self):
        for email_user in self.get_email_users()[0:2]:
            self.send_email(email_user)

    @staticmethod
    def create_event(user, event_id):
        if not user.is_anonymous():
            EmailUsers.objects.create(email_type=EmailUsers.CREATE_EVENT, user=user, event_id=event_id)

    @staticmethod
    def go_to_event(user_id, event_id):
        if user_id:
            EmailUsers.objects.create(email_type=EmailUsers.GO_TO_EVENT, user_id=user_id, event_id=event_id)

    @staticmethod
    def ungo_to_event(user, event_id):
        if not user.is_anonymous():
            EmailUsers.objects.create(email_type=EmailUsers.UN_GO_EVENT, user=user, event_id=event_id)

    #TODO
    @staticmethod
    def sending_rules(self):
        email_users = self.get_email_users()
        for email_user in email_users:
            email_type = email_user.email_type
            event = email_user.event
            if email_type == EmailUsers.CREATE_EVENT:
                # send to event creator one email and to subscribe mailng lis
                self.send_email(email_user)
                # get all users which subscribe to this event and by the event time
                User.objects.filter(pk__in=ActivityUsers.objects.filter(activity__pk=event.activity.pk).
                                                      values_list('id', flat=True))


