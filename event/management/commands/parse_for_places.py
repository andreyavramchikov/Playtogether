import time

from django.conf import settings
from django.core.management.base import BaseCommand
from selenium import webdriver
from optparse import make_option


#python manage.py parse_for_places
class Command(BaseCommand):
    option_list = BaseCommand.option_list + (
       make_option('--url', dest='url', help='URL of website', default=''),
    )
    def handle(self, *args, **options):
        url = options.get('url')
        driver = webdriver.Firefox()
        driver.get(url)
        try:
            container = driver.find_element_by_class_name('text')
            spans = container.find_elements_by_tag_name('span')
            try:
                for span in spans:
                    try:
                        ps = span.find_elements_by_tag_name('p')
                        brs = span.find_elements_by_tag_name('br')

                        address = brs[0].text
                        phone = brs[1].text
                        phone2 = brs[2].text
                        email = brs[3].text
                        site = brs[4].text
                    except:
                        continue
            except:
                pass
        except Exception as e:
            print e


        driver.close()
