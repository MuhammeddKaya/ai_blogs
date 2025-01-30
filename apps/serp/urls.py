from django.urls import  path
from . import views


app_name = 'serp'



urlpatterns = [
    path('', views.serp, name='serp'),
    # path('analyze', views.analyze_url, name='analyze'),
    path('link_analyze/', views.link_analyze, name='link_analyze'),
    path('chat_view/', views.chat_view, name='chat_view'),
    
]