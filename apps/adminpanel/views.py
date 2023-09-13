from django.shortcuts import render
from apps.blog.models import BlogPost

# Create your views here.

from django.views.generic import ListView
from django.views.generic.edit import UpdateView
from .forms import BlogPostForm

class BlogPostListView(ListView):
    model = BlogPost
    template_name = 'adminpanel/blogpost_list.html'  # Şablonunuzu buraya ekleyin
    context_object_name = 'blog_posts'  # Şablon içinde kullanacağınız değişken adı


class BlogPostUpdateView(UpdateView):
    model = BlogPost
    form_class = BlogPostForm  # Özel ModelForm'unuzu buraya ekleyin
    template_name = 'adminpanel/blogpost_edit.html'  # Düzenleme formu şablonunuzu buraya ekleyin
    success_url = '/panel/admin_panel/'  # Başarılı güncelleme sonrası yönlendirme
