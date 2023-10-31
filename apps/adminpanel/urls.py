from django.urls import path
from .views import BlogPostListView, BlogPostUpdateView, BlogPostListAjaxView
from . import views


app_name = 'adminpanel'

    


urlpatterns = [
    # path('admin_panel/', BlogPostListView.as_view(), name='admin_panel'),
    # path('admin_panel/edit/<int:pk>/', edit_blog_post, name='edit_blog_post'),

    path('admin_panel/', BlogPostListView.as_view(), name='admin_panel'),
    path('admin_panel/edit/<int:pk>/', BlogPostUpdateView.as_view(), name='edit_blog_post'),
    path('admin_panel_ajax/',views.BlogPostListAjaxView, name='admin_panel_ajax'),
    path('blog_ajax/',views.blog_ajax, name='blog_ajax'),
    path('blog_ajax_create/',views.blog_ajax_create, name='blog_ajax_create'),
]