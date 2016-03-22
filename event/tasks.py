from celery import task

from mail.sender import EmailSender
# HOW TO RUN LOCALLY
# celery -A playtogether worker -l info


@task(name="sum_two_numbers")
def add(x, y):
    return x + y

@task(name="send_email")
def send_email(user_id, event_id):
    EmailSender().go_to_event(user_id, event_id)
    EmailSender().send_email_template('aldrson@gmail.com')