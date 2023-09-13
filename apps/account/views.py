from django.shortcuts import redirect, render
from django.contrib import messages, auth
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
# Create your views here.


def Login(request):
    print("çalıştı")
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = auth.authenticate(username=username, password=password)
        if user is not None:
            login(request, user)

            return redirect('blog:blog_list') # Giriş başarılı, yönlendirme yapabilirsiniz.
    
    return render(request, 'account/login.html')



@login_required(login_url = 'login')
def Logout(request):
    auth.logout(request)
    messages.success(request, 'You are logged out.')
    return redirect('blog:blog_list')
