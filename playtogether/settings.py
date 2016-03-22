"""
Django settings for playtogether project.

For more information on this file, see
https://docs.djangoproject.com/en/1.7/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.7/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))



# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.7/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'd-4=-7!&mytwbz1rw#4ensf^%4*248wf9!2kqj4o0uxj=s8ydj'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    # 'djcelery',

    'authentication',
    'event',
    'mail',
)


# VK_APP_ID = '5269479'
# VK_API_SECRET = 'GXiQkDrstC2hHGTYsfBG'

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'playtogether.urls'

WSGI_APPLICATION = 'playtogether.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.7/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'playtogether',
        'USER': 'root',
        'PASSWORD': 'pass',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# Internationalization
# https://docs.djangoproject.com/en/1.7/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.7/howto/static-files/

STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(BASE_DIR, 'static')

TEMPLATE_DIRS = (
    '%s/templates/' % BASE_DIR,
)

AUTH_USER_MODEL = 'authentication.User'

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'DEFAULT_FILTER_BACKENDS': ('rest_framework.filters.DjangoFilterBackend',)
}

# BROKER_URL = "amqp://myuser:mypassword@localhost:5672/vhost"
# BROKER_URL = 'amqp://guest:guest@localhost:5672/'
# CELERY_ACCEPT_CONTENT = ["json"]
# CELERY_TASK_SERIALIZER = "json"
#
# CELERY_RESULT_SERIALIZER = "json"
# CELERY_TIMEZONE = "Europe/Madrid"
#
# import djcelery
# djcelery.setup_loader()

# CELERY STUFF
# BROKER_URL = 'redis://localhost:6379'
# CELERY_RESULT_BACKEND = 'redis://localhost:6379'
# CELERY_ACCEPT_CONTENT = ['application/json']
# CELERY_TASK_SERIALIZER = 'json'
# CELERY_RESULT_SERIALIZER = 'json'
# CELERY_TIMEZONE = 'Africa/Nairobi'



# // MUST RETHING ABOUT THE LOGGER AFTER READING THE DOC
# // RIGHT NOW IT IS ADDED FROM CLASSPASS PROJECT JUST TO OUTPUT SQL QUERIES INTO CONSOLE
LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'root': {
        'handlers': ['console_debug_on'],
        'level': 'DEBUG',
    },
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse',
        },
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        }
    },
    'formatters': {
        'verbose': {
            'format': '[%(levelname).1s:%(asctime)s:%(module)s:%(lineno)d] %(message)s'
        },
        'simple': {
            'format': '[%(levelname).1s:%(module)s:%(lineno)d] %(message)s'
        }
    },
    'handlers': {
        'console_debug_on': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'simple',
            'filters': ['require_debug_true']
        },
        'console_debug_off': {
            'level': 'WARNING',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
            'filters': ['require_debug_false'],
        },

    },
    'loggers': {
        'django.request': {
            'handlers': ['console_debug_off'],
            'propagate': True
        },
        'django': {
            'handlers': ['console_debug_on'],
            'propagate': False
        },
    },
}


EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'aldrson@gmail.com'
EMAIL_HOST_PASSWORD = 'andreypasan'

from django.utils.translation import ugettext_lazy as _
LANGUAGES = (
    ('en', _('English')),
    ('ca', _('Catalan')),
)
LOCALE_PATHS = (
    os.path.join(BASE_DIR, 'locale'),
)

# import sys
# if 'test' in sys.argv:
#     DATABASES = {
#         'default': {
#             'ENGINE': 'django.db.backends.sqlite3',
#             'NAME': os.path.join(os.path.dirname(__file__), 'test.db'),
#             'TEST_NAME': os.path.join(os.path.dirname(__file__), 'test.db'),
#        }
#     }