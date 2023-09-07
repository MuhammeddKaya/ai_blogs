from django.shortcuts import render
from django.shortcuts import render,redirect

# Create your views here.
def blog(request):
    return render(request, "blog/blog.html")