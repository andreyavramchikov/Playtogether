# from celery.app.base import Celery
#
# app = Celery('tasks')
# app.conf.CELERY_RESULT_SERIALIZER = 'json'
# app.config_from_object('django.conf:settings')
#
# @app.task
# def add_sum(x, y):
#     return x + y


# from celery import task
# @task()
# def add(x, y):
#     print x + y
#     return x + y