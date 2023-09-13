from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from PIL import Image
from django_resized import ResizedImageField

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name =('Kategori')
        verbose_name_plural = ('Kategoriler')


    def __str__(self):
        return self.name
    

# class BlogPost(models.Model):
#     title = models.CharField(max_length=200)
#     content = models.TextField()
#     author = models.ForeignKey(User, on_delete=models.CASCADE)
#     categories = models.ManyToManyField(Category, related_name='blog_posts')
#     created_at = models.DateTimeField(auto_now_add=True)
#     image = models.ImageField(upload_to='blog_images/', blank=True, null=True)
#     slug = models.SlugField(unique=True, allow_unicode=True, blank=True)

#     class Meta:
#         ordering = ("slug",)
#         verbose_name =('Blog')
#         verbose_name_plural = ('Bloglar')

#     def save(self, *args, **kwargs):
#         if not self.slug:
#             self.slug = slugify(self.title)
#         super().save(*args, **kwargs)



#     def __str__(self):
#         return self.title

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    categories = models.ManyToManyField(Category, related_name='blog_posts')
    created_at = models.DateTimeField(auto_now_add=True)
    image = ResizedImageField(size=[700, 450],upload_to='blog_images/', blank=True, null=True)
    slug = models.SlugField(unique=True, allow_unicode=True, blank=True)

    class Meta:
        ordering = ("slug",)
        verbose_name =('Blog')
        verbose_name_plural = ('Bloglar')

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
    


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    blog_post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)



    class Meta:
        ordering = ("created_at",)
        verbose_name =('yorum')
        verbose_name_plural = ('yorumlar')

    def __str__(self):
        return self.text


class Reply(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='replies')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("created_at",)
        verbose_name =('Yanıt')
        verbose_name_plural = ('Yanıtlar')

    def __str__(self):
        return self.text