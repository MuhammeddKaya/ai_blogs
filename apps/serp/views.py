from django.shortcuts import render, get_object_or_404
import requests
import os
import json
from bs4 import BeautifulSoup
from django.http import JsonResponse
import base64


# Create your views here.


def serp(request):
    # serp deneme.
    
    # blog_posts = BlogPost.objects.all()

    # context = {
    #     'blog_posts': blog_posts,
    # }

    return render(request, 'serp/serp.html')


def check_url_status(url):
        try:
            response = requests.get(url)
            return response.status_code
        except requests.exceptions.RequestException:
            return None
        

def get_seo(domain,device):
    url = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
    params = {
        'url': domain,
        'strategy': device,
        'key': "",
        'category': ["performance", "seo", "accessibility","pwa","best_practices"],
    }
    response = requests.get(url, params)
    

    if response.status_code == 200:
        return response.json()
    else:
        raise ValueError(f"API request failed: {response.status_code}")
    


def analyze_sub_url(request):
    print("ajax view çalıştı")
    if request.method == "GET":
        link = request.GET.get("link")
        print("analyze_sub_url çalıştı")
        print(link)
        

        sub_page_seo_result = get_seo(link,"mobile")
        sub_page_seo_score = sub_page_seo_result['lighthouseResult']["categories"]["performance"]["score"]
        print(sub_page_seo_score)
        response_data = {
            "sub_page_seo_score": sub_page_seo_score,
        }
        return JsonResponse(response_data)

def check_content_compatibility(title, meta_description, paragraphs):
    # Paragrafları birleştir
    combined_paragraphs = " ".join(paragraphs)

    # Kontrol için prompt oluştur
    def create_prompt(element, content):
        return f"""
        You are a content quality analyst. Your task is to determine if the {element} is semantically compatible with the main content provided below.  Consider the meaning, topics covered, and overall message.

        {element}: {content.splitlines()[0] if element != 'Paragraphs' else content}

        Main Content:
        {' '.join(content.splitlines()[1:]) if element != 'Paragraphs' else ''}

        Answer with only 'Yes' or 'No'.
    """

    # API isteği gönder ve yanıtı al
    def get_compatibility(element, content):
        prompt = create_prompt(element, content)
        response = requests.post('http://localhost:11434/api/generate',
        json={
            "model": "deepseek-r1:1.5b", # ,llama3.2:1b
            "prompt": prompt,
            "stream": False,
        })
        response = response.json()
        return response['response'].strip()

    # Her bir öğe için uyumluluğu kontrol et
    results = {
        'title': get_compatibility('Title', f"{title}\n{combined_paragraphs}"),
        'meta_description': get_compatibility('Meta Description', f"{meta_description}\n{combined_paragraphs}")
    }

    return results

    

def get_website_data(url):
    try:
        # Web sitesine GET isteği gönder
        response = requests.get(url)
        response.raise_for_status()  # İstek başarılı olmadıysa hata fırlat

        # Web sitesinin içeriğini al
        html_content = response.text

        # BeautifulSoup ile HTML içeriğini ayrıştır
        soup = BeautifulSoup(html_content, 'html.parser')

        # Web sitesinin başlığını al
        title = soup.title.string if soup.title else 'No title found'

        # Web sitesinin meta açıklamasını al
        meta_description = ''
        if soup.find('meta', attrs={'name': 'description'}):
            meta_description = soup.find('meta', attrs={'name': 'description'}).get('content', '')

        # Web sitesindeki başlık etiketlerini al
        headings = {f'h{i}': [h.get_text(strip=True) for h in soup.find_all(f'h{i}')] for i in range(1, 7)}

        # Web sitesindeki bağlantıları al
        links = [a.get('href') for a in soup.find_all('a', href=True)]

        # Web sitesindeki resimleri al
        images = [img.get('src') for img in soup.find_all('img', src=True)]

        # Web sitesindeki paragrafları al
        paragraphs = [p.get_text(strip=True) for p in soup.find_all('p')]

        # Web sitesinin içeriğini döndür
        data = {
            'title': title,
            'meta_description': meta_description,
            'headings': headings,
            'links': links,
            'images': images,
            'paragraphs': paragraphs,
            'html_content': html_content
        }
        # JSON formatında düzenli bir şekilde döndür
        json_data = json.dumps(data, indent=4, ensure_ascii=False)

        # # JSON verilerini dosyaya kaydet
        # domain_name = url.split("//")[-1].split("/")[0]
        # file_name = f"{domain_name}.json"
        # with open(file_name, 'w', encoding='utf-8') as json_file:
        #     json_file.write(json_data)

        return json_data

    except requests.exceptions.RequestException as e:
        # Hata durumunda hata mesajını döndür
        return json.dumps({'error': str(e)}, indent=4, ensure_ascii=False)

def link_analyze(request):
    if request.method == "GET":
        raw_domain_name = request.GET.get("link")
        print(raw_domain_name)

        if not raw_domain_name.startswith(("http://", "https://")):
            domain_name = f"https://{raw_domain_name}"
        status = check_url_status(domain_name)

        print("status",status, type(status))

        if status == 200:

            print("analyze_sub_url çalıştı")
            print(domain_name)

            website_data = get_website_data(domain_name)
            # print(website_data)

            # JSON verisini yükle
            website_data = json.loads(website_data)

            # Title, meta description ve paragraphs verilerini al
            title = website_data.get('title', '')
            meta_description = website_data.get('meta_description', '')
            paragraphs = website_data.get('paragraphs', [])

            # Anlamsal uyumluluğu kontrol et
            compatibility_result = check_content_compatibility(title, meta_description, paragraphs)
            print(compatibility_result)
            

#--------------------------------------------------------------------------------------------------------------------------
#------------ Mobile Side Data--------------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------------------------------------
            with open("./json_ref/tr_TR.json", "r") as dosya:
                mobile_result_tr = json.load(dosya)

                


            #mobile_result = get_seo(domain_name,"mobile")
            with open("./json/desktop_www.impalabt.com.json", "r") as mobile_dosya:
                mobile_result = json.load(mobile_dosya)






            # with open("./json/mobile_www.impalabt.com.json", "r") as mobile_dosya:
            #     mobile_result = json.load(mobile_dosya)
            # current_directory = os.getcwd()
            # file_name = 'json/mobile_'+ f"{domain_name.replace('https://', '')}.json"
            # file_path = os.path.join(current_directory, file_name)

            # with open(file_path, "w") as f:
            #     json.dump(mobile_result, f)

            #----- seo - performance-accessiblity best-practices--------------------------------------
            mobile_performance_score                 = mobile_result['lighthouseResult']["categories"]["performance"]["score"]
            mobile_accessibility_score               = mobile_result['lighthouseResult']["categories"]["accessibility"]["score"]
            mobile_seo_score                         = mobile_result['lighthouseResult']["categories"]["seo"]["score"]
            mobile_best_practices_score              = mobile_result['lighthouseResult']["categories"]["best-practices"]["score"]


            mobile_fullPageScreenshot                = mobile_result['lighthouseResult']["fullPageScreenshot"]["screenshot"]["data"]


            #-------METRİKLER------------------------------------------
            mobile_first_contentful_paint             = mobile_result['lighthouseResult']["audits"]["first-contentful-paint"]["displayValue"]
            mobile_largest_contentful_paint           = mobile_result['lighthouseResult']["audits"]["largest-contentful-paint"]["score"]
            mobile_total_blocking_time                = mobile_result['lighthouseResult']["audits"]["total-blocking-time"]["displayValue"]
            mobile_cumulative_layout_shift            = mobile_result['lighthouseResult']["audits"]["cumulative-layout-shift"]["displayValue"]
            mobile_speed_index                        = mobile_result['lighthouseResult']["audits"]["speed-index"]["displayValue"]

            #-------DIAGNOSTICS------------------------------------------
            mobile_minimizes_main_thread_work         = mobile_result['lighthouseResult']["audits"]["mainthread-work-breakdown"]
            #-------audit list------------------------------------------
            mobile_performance_audit_list             = mobile_result['lighthouseResult']["categories"]["performance"]["auditRefs"]
            mobile_accessibility_audit_list           = mobile_result['lighthouseResult']["categories"]["accessibility"]["auditRefs"]
            mobile_best_practices_audit_list          = mobile_result['lighthouseResult']["categories"]["best-practices"]["auditRefs"]
            mobile_seo_audit_list                     = mobile_result['lighthouseResult']["categories"]["seo"]["auditRefs"]


#--------------------------------------------------------------------------------------------------------------------------
#------------ Desktop Side Data--------------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------------------------------------
            #desktop_result = get_seo(domain_name,"desktop")

            with open("./json/desktop_www.impalabt.com.json", "r") as desktop_dosya:
                desktop_result = json.load(desktop_dosya)


            # current_directory = os.getcwd()
            # file_name = 'json/desktop_'+ f"{domain_name.replace('https://', '')}.json"
            # file_path = os.path.join(current_directory, file_name)

            # with open(file_path, "w") as f:
            #     json.dump(desktop_result, f)

            #----- seo - performance-accessiblity best-practices--------------------------------------
            desktop_performance_score                 = desktop_result['lighthouseResult']["categories"]["performance"]["score"]
            desktop_accessibility_score               = desktop_result['lighthouseResult']["categories"]["accessibility"]["score"]
            desktop_seo_score                         = desktop_result['lighthouseResult']["categories"]["seo"]["score"]
            desktop_best_practices_score              = desktop_result['lighthouseResult']["categories"]["best-practices"]["score"]

            desktop_fullPageScreenshot                = desktop_result['lighthouseResult']["fullPageScreenshot"]["screenshot"]["data"]


            #-------METRİKLER------------------------------------------
            desktop_first_contentful_paint             = desktop_result['lighthouseResult']["audits"]["first-contentful-paint"]["displayValue"]
            desktop_largest_contentful_paint           = desktop_result['lighthouseResult']["audits"]["largest-contentful-paint"]["score"]
            desktop_total_blocking_time                = desktop_result['lighthouseResult']["audits"]["total-blocking-time"]["displayValue"]
            desktop_cumulative_layout_shift            = desktop_result['lighthouseResult']["audits"]["cumulative-layout-shift"]["displayValue"]
            desktop_speed_index                        = desktop_result['lighthouseResult']["audits"]["speed-index"]["displayValue"]
            
            #-------audit list------------------------------------------
            desktop_performance_audit_list             = desktop_result['lighthouseResult']["categories"]["performance"]["auditRefs"]
            desktop_accessibility_audit_list           = desktop_result['lighthouseResult']["categories"]["accessibility"]["auditRefs"]
            desktop_best_practices_audit_list          = desktop_result['lighthouseResult']["categories"]["best-practices"]["auditRefs"]
            desktop_seo_audit_list                     = desktop_result['lighthouseResult']["categories"]["seo"]["auditRefs"]


            desktop_seo_audit_categories                    = desktop_result['lighthouseResult']["categories"]

            #------------ --------------------------------------------------------------------------------------------------------------



            
            # print("mobile seo score",mobile_seo_score)
            # print("mobile_performance_score",mobile_performance_score)
            # print("mobile best_practices score",mobile_best_practices_score)
            # print("desktop seo score",desktop_seo_score)
            # print("desktop seo score type",desktop_seo_score)
            # print("desktop_first_contentful_paint",type(desktop_first_contentful_paint))
            # print("desktop_total_blocking_time",type(desktop_total_blocking_time))
            # print("desktop_speed_index",type(desktop_speed_index))
            # print("mobile_minimizes_main_thread_work",mobile_minimizes_main_thread_work)@

            mobile_audit = mobile_result['lighthouseResult']["audits"]
            desktop_audit = desktop_result['lighthouseResult']["audits"]
            audit_tr = mobile_result_tr['lighthouseResult']["audits"]
            # print(audit_tr)
            # audit_list = audit.keys()
            # print("audittttttt",len(audit_list))
            # with open('audit_keys.txt', 'w') as file:
            #     for key in audit_list:
            #         file.write(key + '\n')

            response_data = {
                #----------------------------------------------------------------
                #--------------------Mobile-------------------------------------
                #----------------------------------------------------------------
                "mobile_performance_score"             : mobile_performance_score,
                "mobile_accessibility_score"           : mobile_accessibility_score,
                "mobile_best_practices_score"          : mobile_best_practices_score,
                "mobile_seo_score"                     : mobile_seo_score,
                "mobile_fullPageScreenshot"            : mobile_fullPageScreenshot,
                                
                #--------------------Metrics-------------------------------------

                "mobile_first_contentful_paint"        : mobile_first_contentful_paint,
                "mobile_largest_contentful_paint"      : mobile_largest_contentful_paint,
                "mobile_total_blocking_time"           : mobile_total_blocking_time,
                "mobile_cumulative_layout_shift"       : mobile_cumulative_layout_shift,
                "mobile_speed_index"                   : mobile_speed_index,
                
                #--------------------All_Audits-------------------------------------
                "mobile_minimizes_main_thread_work"    : mobile_minimizes_main_thread_work,
                "mobile_audit"                  : mobile_audit,
                "audit_tr"                      : audit_tr,
                #--------------------audit list-------------------------------------
                "mobile_performance_audit_list"          : mobile_performance_audit_list,
                "mobile_accessibility_audit_list"        : mobile_accessibility_audit_list,
                "mobile_best_practices_audit_list"       : mobile_best_practices_audit_list,
                "mobile_seo_audit_list"                  : mobile_seo_audit_list,




                #----------------------------------------------------------------
                #--------------------Desktop-------------------------------------
                #----------------------------------------------------------------
                "desktop_first_contentful_paint"        : desktop_first_contentful_paint,
                "desktop_largest_contentful_paint"      : desktop_largest_contentful_paint,
                "desktop_total_blocking_time"           : desktop_total_blocking_time,
                "desktop_cumulative_layout_shift"       : desktop_cumulative_layout_shift,
                "desktop_speed_index"                   : desktop_speed_index,
                #--------------------Metrics-------------------------------------
                "desktop_performance_score"             : desktop_performance_score,
                "desktop_accessibility_score"           : desktop_accessibility_score,
                "desktop_seo_score"                     : desktop_seo_score,
                "desktop_best_practices_score"          : desktop_best_practices_score,
                "desktop_fullPageScreenshot"            : desktop_fullPageScreenshot,
                #--------------------All_Audits-------------------------------------
                "desktop_audit"                 : desktop_audit,
                #--------------------audit list-------------------------------------
                "desktop_performance_audit_list"          : desktop_performance_audit_list,
                "desktop_accessibility_audit_list"        : desktop_accessibility_audit_list,
                "desktop_best_practices_audit_list"       : desktop_best_practices_audit_list,
                "desktop_seo_audit_list"                  : desktop_seo_audit_list,

                #--------------------audit categoies for weight evaluation-------------------------------------
                "desktop_seo_audit_categories"            : desktop_seo_audit_categories,
                #---------web data------------------------------------------------
                "website_data": website_data,

            }
            return JsonResponse(response_data)
        
        else:

            raise ValueError(f"API request failed: {status}")
