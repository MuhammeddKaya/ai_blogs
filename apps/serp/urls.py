from django.urls import  path
from . import views


app_name = 'serp'



urlpatterns = [
    path('', views.serp, name='serp'),
    path('analyze', views.analyze_url, name='analyze'),
    path('sub_link_analyze/', views.analyze_sub_url, name='sub_link_analyze'),
    
]