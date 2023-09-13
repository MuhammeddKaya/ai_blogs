from django import forms
from apps.blog.models import BlogPost


class BlogPostForm(forms.ModelForm):
    class Meta:
        model = BlogPost
        fields = ['title', 'content', 'author', 'categories', 'image']  # Düzenlemek istediğiniz alanları burada belirtin
