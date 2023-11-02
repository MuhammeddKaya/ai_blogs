from django.shortcuts import render
from django.http import JsonResponse
import openai
from apps.blog.models import BlogPost
import base64
from django.core.files.base import ContentFile

# Create your views here.



openai.api_key = ''

def get_completion(prompt_blog):
	query = openai.Completion.create(
		engine="text-davinci-003",
		prompt=prompt_blog,
		max_tokens=1024,
		n=1,
		stop=None,
		temperature=0.5,
	)

	response = query.choices[0].text
	print(response)
	return response

def get_image_completion(prompt):
	response = openai.Image.create(
		prompt=prompt,
		n=1,
		response_format="b64_json", #'url,json'
		size='1024x1024' 			#'512x512,256x256'
	)

	response=response["data"][0]["b64_json"]
	# print(response)
	return response


def query_view(request):
	if request.method == 'POST':
		prompt = request.POST.get('prompt')
		prompt_blog = prompt+ "bu konu hakkında en az 400 en çok 1000 karakter olacak bir blog yazısı yaz"
		response = get_completion(prompt_blog)
		image_response = get_image_completion(prompt)
		image = base64.b64decode(image_response)
		image_file = ContentFile(image)


		if prompt:
			author = request.user  # İstek yapan kullanıcıyı yazar olarak kullanabilirsiniz (giriş yapmış bir kullanıcı olmalı)
			
			new_blog_post = BlogPost(title=prompt, content=response, author=author)
			new_blog_post.image.save(f"{prompt}.png", image_file)
			new_blog_post.save()
	
		return JsonResponse({'response': response})
	return render(request, 'chatai/chat.html')
