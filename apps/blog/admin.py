from django.contrib import admin
from .models import BlogPost, Category, Comment, Reply

# Register your models here.



admin.site.register(BlogPost)
admin.site.register(Category)
admin.site.register(Comment)
admin.site.register(Reply)

