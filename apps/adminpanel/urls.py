from django.urls import path
from .views import BlogPostListView, BlogPostUpdateView

app_name = 'adminpanel'

    


urlpatterns = [
    # path('admin_panel/', BlogPostListView.as_view(), name='admin_panel'),
    # path('admin_panel/edit/<int:pk>/', edit_blog_post, name='edit_blog_post'),

    path('admin_panel/', BlogPostListView.as_view(), name='admin_panel'),
    path('admin_panel/edit/<int:pk>/', BlogPostUpdateView.as_view(), name='edit_blog_post'),
]