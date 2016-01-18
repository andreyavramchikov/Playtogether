from fabric.api import env, run
from fabric.operations import sudo

env.hosts = [
    'ec2-52-90-107-10.compute-1.amazonaws.com'
]

env.user = 'ubuntu'
env.key_filename = '/home/andrey/Playtogether.pem'
env.project_name = 'Playtogether'
env.path = '/home/ubuntu/projects/%(project_name)s' % env
env.env_path = '%(path)s/env' % env
env.repo_path = '%(path)s/repository' % env

# ssh -i ~/Playtogether.pem ubuntu@ec2-52-90-107-10.compute-1.amazonaws.com

def setup():
    # STILL NEED TO INSTALL MANUALLY MYSQL AND PYTHON-MYSQL ETC
    sudo('apt-get update -y')
    sudo('apt-get upgrade')
    sudo('apt-get install python-dev')
    sudo('apt-get install python-virtualenv')
    sudo('apt-get install libmysqlclient-dev')
    sudo('pip install virtualenvwrapper')  # must update .bashrc still manually
    run('source ~/.bashrc')
    run('mkvirtualenv playtogether --no-site-packages')
    run('source ~/.virtualenvs/playtogether/bin/activate')


def deploy():
    sudo('rm -rf projects')  # MUST REMOVE IT
    sudo('rm -rf /etc/nginx/sites-enabled/mysite_nginx.conf')  # MUST REMOVE IT
    sudo('apt-get install nginx')
    sudo('apt-get install git')
    setup_directories()
    setup_virtualenv()
    clone_repo()
    install_requirements()
    sudo(
        'ln -s /home/ubuntu/projects/Playtogether/repository/mysite_nginx.conf /etc/nginx/sites-enabled/')  # MUST REMOVE IT
    sudo('/etc/init.d/nginx restart')
    run(
        'cp -r /home/ubuntu/projects/Playtogether/repository/event/static/ /home/ubuntu/projects/Playtogether/repository/')
    # activate_virtualenv()
    # run('pip install uwsgi') #manually still
    # run('source %(env_path)s/bin/activate; python manage.py migrate' % env)
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


def activate_virtualenv():
    run('source %(env_path)s/bin/activate;' % env)


def setup_virtualenv():
    """
    Setup a fresh virtualenv.
    """
    run('virtualenv %(env_path)s --no-site-packages;' % env)
    run('source %(env_path)s/bin/activate;' % env)

#
# """
# Base configuration
# """
# env.project_name = '$(project)'
# env.database_password = '$(db_password)'
# env.site_media_prefix = "site_media"
# env.admin_media_prefix = "admin_media"
# env.newsapps_media_prefix = "na_media"
# env.path = '/home/newsapps/sites/%(project_name)s' % env
# env.log_path = '/home/newsapps/logs/%(project_name)s' % env
# env.env_path = '%(path)s/env' % env
# env.repo_path = '%(path)s/repository' % env
# env.apache_config_path = '/home/newsapps/sites/apache/%(project_name)s' % env
# env.python = 'python2.6'
#
#
# def setup():
#     """
#     Setup a fresh virtualenv, install everything we need, and fire up the database.
#
#     Does NOT perform the functions of deploy().
#     """
#
#     setup_directories()
#     setup_virtualenv()
#     clone_repo()
#     checkout_latest()
#     destroy_database()
#     create_database()
#     load_data()
#     install_requirements()
#     install_apache_conf()
#     deploy_requirements_to_s3()
#
# def setup_directories():
#     """
#     Create directories necessary for deployment.
#     """
#     run('mkdir -p %(path)s' % env)
#     run('mkdir -p %(env_path)s' % env)
#     run ('mkdir -p %(log_path)s;' % env)
#     sudo('chgrp -R www-data %(log_path)s; chmod -R g+w %(log_path)s;' % env)
#     run('ln -s %(log_path)s %(path)s/logs' % env)
#
#
# def setup_virtualenv():
#     """
#     Setup a fresh virtualenv.
#     """
#     run('virtualenv -p %(python)s --no-site-packages %(env_path)s;' % env)
#     run('source %(env_path)s/bin/activate; easy_install -U setuptools; easy_install pip;' % env)
#
#
# def clone_repo():
#     """
#     Do initial clone of the git repository.
#     """
#     run('git clone git@tribune.unfuddle.com:tribune/%(project_name)s.git %(repo_path)s' % env)
#
#
# def checkout_latest():
#     """
#     Pull the latest code on the specified branch.
#     """
#     run('cd %(repo_path)s; git checkout %(branch)s; git pull origin %(branch)s' % env)
#
#
# def install_requirements():
#     """
#     Install the required packages using pip.
#     """
#     run('source %(env_path)s/bin/activate; pip install -E %(env_path)s -r %(repo_path)s/requirements.txt' % env)
#
#
# def deploy():
#     sudo('apt-get update')
#     sudo('apt-get apt-get upgrade')
#     setup_virtualenv()
#     install_requirements()
#     configure_nginx()
