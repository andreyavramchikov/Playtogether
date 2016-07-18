from fabric.api import env, run
from fabric.operations import sudo

# env.hosts = ['127.0.0.1:2222']
# env.user = 'vagrant'
# env.key_filename = '/home/andrey/Dropbox/playtogether/.vagrant/machines/default/virtualbox/private_key'
env.user = 'ubuntu'
env.hosts = [
    'ec2-52-201-228-26.compute-1.amazonaws.com'
]


env.key_filename = '/home/andrey/Test.pem'

env.project_name = 'Playtogether'
env.path = '/home/ubuntu/projects/%(project_name)s' % env
# env.path = '/home/vagrant/projects/%(project_name)s' % env
env.env_path = '%(path)s/env' % env
env.repo_path = '%(path)s/repository' % env
env.supervisor_log_path = '%(path)s/repository/logs' % env
# ssh -i ~/Test.pem ubuntu@http://ec2-52-207-246-132.compute-1.amazonaws.com


def setup():
    # STILL NEED TO INSTALL MANUALLY MYSQL AND PYTHON-MYSQL ETC
    sudo('apt-get -y update')
    sudo('apt-get -y upgrade')
    sudo('apt-get -y install python-dev')
    sudo('apt-get -y install python-virtualenv')
    sudo('apt-get -y install libmysqlclient-dev')
    sudo('pip install virtualenvwrapper')  # must update .bashrc still manually
    sudo('apt-get install -y mysql-server')
    create_database('playtogether')
    sudo('apt-get install -y git')
    sudo('apt-get install -y nginx')
    sudo('apt-get install -y supervisor')


"""
all comes from
http://michal.karzynski.pl/blog/2013/06/09/django-nginx-gunicorn-virtualenv-supervisor/
"""
def deploy_gunicorn():
    sudo('rm -rf projects')
    sudo('rm -rf /etc/nginx/sites-enabled/playtogether_gunicorn_nginx.conf')
    setup_directories()
    setup_virtualenv()
    clone_repo()
    install_requirements()
    run_django_commands()
    run('chmod u+x %(repo_path)s/gunicorn_start' %env)
    run('/home/ubuntu/projects/Playtogether/repository/gunicorn_start')
    restart_nginx()
    run_supervisor()


def create_database(name):
    run('mysqladmin -u %s -p%s create %s' % ('root', 'pass', name))


def restart_nginx():
    sudo('/etc/init.d/nginx restart')


def setup_nginx():
    sudo('sudo cp /home/ubuntu/projects/Playtogether/repository/playtogether_gunicorn_nginx.conf /etc/nginx/sites-available/')
    sudo('ln -s /etc/nginx/sites-available/playtogether_gunicorn_nginx.conf /etc/nginx/sites-enabled/playtogether_gunicorn_nginx.conf')


def run_django_commands():
    run('source %(env_path)s/bin/activate; %(env_path)s/bin/python %(repo_path)s/manage.py migrate' % env)
    run('source %(env_path)s/bin/activate; %(env_path)s/bin/python %(repo_path)s/manage.py collectstatic --noinput' % env)
    run('cp -r /home/ubuntu/projects/Playtogether/repository/event/static/ /home/ubuntu/projects/Playtogether/repository/')


def run_supervisor():
    sudo('cp %(repo_path)s/supervisor_playtogether.conf /etc/supervisor/conf.d/' %env)
    sudo('supervisorctl reread')
    sudo('supervisorctl update')
    sudo('supervisorctl start playtogether')
    sudo('supervisorctl stop playtogether')
    sudo('supervisorctl restart playtogether')


# deploy site with nginx-uwsgi conjunction
def deploy():
    sudo('rm -rf projects')
    sudo('rm -rf /etc/nginx/sites-enabled/mysite_nginx.conf')
    setup_directories()
    setup_virtualenv()
    clone_repo()
    install_requirements()
    sudo(
        'ln -s /home/ubuntu/projects/Playtogether/repository/mysite_nginx.conf /etc/nginx/sites-enabled/')  # MUST REMOVE IT
    # sudo(
    #     'ln -s /home/vagrant/projects/Playtogether/repository/mysite_nginx.conf /etc/nginx/sites-enabled/')  # MUST REMOVE IT

    sudo('/etc/init.d/nginx restart')
    run(
        'cp -r /home/ubuntu/projects/Playtogether/repository/event/static/ /home/ubuntu/projects/Playtogether/repository/')
    # run(
    #     'cp -r /home/vagrant/projects/Playtogether/repository/event/static/ /home/vagrant/projects/Playtogether/repository/')

    run('source %(env_path)s/bin/activate; %(env_path)s/bin/python %(repo_path)s/manage.py migrate' % env)
    run('source %(env_path)s/bin/activate; %(env_path)s/bin/python %(repo_path)s/manage.py collectstatic' % env)

    run('source %(env_path)s/bin/activate; pip install uwsgi' % env)
    run('source %(env_path)s/bin/activate; uwsgi --ini %(repo_path)s/mysite_uwsgi.ini' % env)#manually still


def install_requirements():
    """
    Install the required packages using pip.
    """
    run('source %(env_path)s/bin/activate; pip install -r %(repo_path)s/requirements.txt' % env)


def clone_repo():
    """
    Do initial clone of the git repository.
    """
    run('git clone https://github.com/andreyavramchikov/%(project_name)s.git %(repo_path)s' % env)


def setup_directories():
    """
    Create directories necessary for deployment.
    """
    run('mkdir -p %(path)s' % env)
    run('mkdir -p %(env_path)s' % env)
    # run('mkdir -p %(supervisor_log_path)s' % env)
    # run('touch %(supervisor_log_path)s/gunicorn_supervisor.log')


def activate_virtualenv():
    run('source %(env_path)s/bin/activate;' % env)


def setup_virtualenv():
    """
    Setup a fresh virtualenv.
    """
    run('virtualenv %(env_path)s --no-site-packages;' % env)
    run('source %(env_path)s/bin/activate;' % env)