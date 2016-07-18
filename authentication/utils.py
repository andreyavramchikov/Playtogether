from django.utils import translation
from django.utils.translation import ugettext_lazy as _


def _translate_dict(dict):
    translation.activate('ru')
    for key, value in dict.items():
        if type(value) is list:
            dict[key] = [_(value[0])] #create list to consistency (what come same out=)
        else:
            dict[key] = _(value)
    return dict
