"""
Django settings for software_antropometrico project.

Generated by 'django-admin startproject' using Django 5.1.4.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-iqnt#dae#axl$j09iih8r_o^(b&!z$vp(3+&l1(2r2ha@$mxmo'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Application definition

INSTALLED_APPS = [
    'numpy',
    'ajax_datatable',
    'import_export',
    'plotly',
    'planes_dieteticos',
    'reportes',
    'pacientes',
    'alimentos',
    'django_tables2',
    'jazzmin',
    'rest_framework',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
MIDDLEWARE = [
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

JAZZMIN_SETTINGS = {
     "changeform_format_overrides": {
        "planes_dieteticos.PlanDietetico": "horizontal_tabs", 
        "pacientes.Paciente":"horizontal_tabs" 
    },
    "related_modal_active": True,
    "custom_css": "css/admin_custom.css",
    "language_chooser": True,
    "show_ui_builder": True,
    "site_logo": "images/site.png",
    "login_logo": "images/login.png",
    "site_icon": "images/site.png",
    "user_avatar": "images/user.png",
    "site_title": "Panel de Administración",
    "site_brand": "NutriFit",
    "user_avatar": "images/avatar.png",
    "site_header": "NutriFit",
    "welcome_sign": "Bienvenido al Panel de Control de NutriFit",

    "custom_links": {
    "reports": [  
            {
                "name": "Reportes",  
                "url": "admin:reportes",  
                "icon": "fas fa-chart-line",  
                "permissions": ["auth.view_user"],  
            }
        ]
    },
    "topmenu_links": [
        {"name": "Inicio", "url": "/", "permissions": ["auth.view_user"]},
        {"name": "Dashboard", "url": "/admin/", "permissions": ["auth.view_user"]},
        {"name": "Reportes", "url": "/reportes/", "permissions": ["auth.view_user"]},
    ],
     "icons": {
        "auth": "fas fa-users-cog",  
        "auth.User": "fas fa-user",  
        "auth.Group": "fas fa-users", 
        "pacientes.Paciente": "fas fa-user-md", 
        "alimentos.Alimento": "fas fa-utensils",
        "alimentos.Grupo":"fas fa-bowl-food"
    },
    "recent_actions": True,
}

JAZZMIN_UI_TWEAKS = {
    "navbar_small_text": False,
    "footer_small_text": False,
    "body_small_text": False,
    "brand_small_text": False,
    "brand_colour": "navbar-teal",
    "accent": "accent-teal",
    "navbar": "navbar-white navbar-light",
    "no_navbar_border": False,
    "navbar_fixed": False,
    "layout_boxed": False,
    "footer_fixed": False,
    "sidebar_fixed": False,
    "sidebar": "sidebar-light-teal",
    "sidebar_nav_small_text": False,
    "sidebar_disable_expand": False,
    "sidebar_nav_child_indent": False,
    "sidebar_nav_compact_style": False,
    "sidebar_nav_legacy_style": False,
    "sidebar_nav_flat_style": False,
    "theme": "default",
    "dark_mode_theme": None,
    "button_classes": {
        "primary": "btn-primary",
        "secondary": "btn-secondary",
        "info": "btn-info",
        "warning": "btn-warning",
        "danger": "btn-danger",
        "success": "btn-success"
    }
}

ROOT_URLCONF = 'software_antropometrico.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        #'DIRS':'', 
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'software_antropometrico.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
   'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'bdspdya',
        'USER': 'root',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'es-pe'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

LANGUAGES = [
    ('en', 'English'),
    ('es', 'Español'),
]


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [
    BASE_DIR / "static",  # Directorio de archivos estáticos
]
X_FRAME_OPTIONS = 'SAMEORIGIN'


# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
