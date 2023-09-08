from django.shortcuts import render, get_object_or_404
from .models import BlogPost

# Create your views here.


# def blog(request):
#     return render(request, "blog/blog.html")



def blog_list(request):
    # Tüm blog gönderilerini çekiyoruz.
    
    blog_posts = BlogPost.objects.all()

    context = {
        'blog_posts': blog_posts,
    }

    return render(request, 'blog/blog.html',context)

def blog_detail(request, slug):

    # Blog gönderisini slug'a göre alıyoruz veya 404 hatası döndürüyoruz.

    blog_post = get_object_or_404(BlogPost, slug=slug)

    context = {
        'blog_posts': blog_post,
    }

    return render(request, 'blog/blog_detail.html', context)

