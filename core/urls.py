"""
URL configuration for ai_blog project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from . import views
# from apps.blog import views as blog_views

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', blog_views.blog_list, name='blog_list'),
    path('blog', include('apps.blog.urls')),
    path('account/', include('apps.account.urls')),
    path('serp/', include('apps.serp.urls')),
    path('chatai/', include('apps.chatai.urls')),
    # path('', views.query_view, name='query'),
    path('panel/', include('apps.adminpanel.urls')), #admin app için
]



if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)