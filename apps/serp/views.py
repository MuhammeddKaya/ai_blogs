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
    


# def analyze_url(request):
#     """ bu fonksiyon verilen url için seo analiz işlemi yapmaktadır """
#     if request.method == "POST":
#         raw_domain_name = request.POST.get("domain_name")

#         if not raw_domain_name.startswith(("http://", "https://")):
#             domain_name = f"https://{raw_domain_name}"
#         status = check_url_status(domain_name)
#         print("status",status, type(status))
#         if status == 200:
#         #------------------------------------------------ANA SAYFA SEO DEĞERLERİ------------------------------------------------------
#             #----devices--------------------
#             # devices = ["mobile", "desktop"]  # İşlemi farklı cihazlarda yapmak istediğiniz parametreleri buraya ekleyin
#             # seo_result_mobile = get_seo(domain_name,devices[0])
#             # seo_result_desktop = get_seo(domain_name,devices[1])
#             # for device in devices:
#             #     seo_result = get_seo(domain_name, device)

#             #     # JSON yanıtını bir dosyaya kaydet
#             #     current_directory = os.getcwd()
#             #     file_name = f'json/{domain_name.replace("https://", "")}_{device}.json'
#             #     file_path = os.path.join(current_directory, file_name)

#             #     with open(file_path, "w") as f:
#             #         json.dump(seo_result, f)  
                            
#             # main_page_score = seo_result_desktop['lighthouseResult']["categories"]["performance"]["score"]
#             # main_page_score = seo_result_mobile['lighthouseResult']["categories"]["performance"]["score"]
#             main_page_score=5
#         #-----------------------------------------------------------------------------------------------------------------------------
#             print("if 2")
#             urlresponse = requests.get(domain_name, verify=False)
#             content = urlresponse.content
#             soup = BeautifulSoup(content, 'html.parser')
#             sitemap_link = soup.find('a', {'href': '/sitemap.xml'})
#             print(sitemap_link)
#             if sitemap_link:
#                 print("sitemap link çalıştı")
#                 # Sitemap linkini al
#                 sitemap_url = domain_name + sitemap_link['href']
#                 site_map_response = requests.get(sitemap_url)
#                 soup = BeautifulSoup(site_map_response.text, 'html.parser')
#                 sitemap_link_list = [loc.text for loc in soup.find_all('loc')]
#                 if sitemap_link_list:
#                     url_count = len(sitemap_link_list)
#                     sub_links = set()
#                     context = {
#                         "raw_domain_name": raw_domain_name,
#                         "sitemap_link_list": sitemap_link_list,
#                         "url_count": url_count,
#                         "main_page_score": main_page_score,
#                     }
#                     print(sub_links)
#                     return render(request, "serp/serp_result.html", context)
#             else:
#                 print("sitemap link  else çalıştı")
#                 sitemap_link_list = set()
#                 for link in soup.find_all("a"):
#                     href = link.get("href")
#                     if href and not href.startswith(("http://", "https://")):
#                         full_link = domain_name + href
#                         sitemap_link_list.add(full_link)
#                 url_count = len(sitemap_link_list)
#                 print(sitemap_link_list)
#                 context = {
#                     "raw_domain_name": raw_domain_name,
#                     "sitemap_link_list": sitemap_link_list,
#                     "url_count": url_count,
#                     "main_page_score": main_page_score,
#                 }
#                 return render(request, "serp/serp_result.html", context)
#         else:
#             print("if1")
#             status_error = "Aradığınız domain bulunamadı. Lütfen domain adını doğru yazdığından emin olun.  Ayrıca sorun sunucu kaynaklı olabileceği için br süre sonra tekrar deneyebilirsiniz."
#             context = {
#                 "status_error": status_error
#             }
#             return render(request, "serp/serp.html", context)
#     else:
#         print("else çalıştı")
#         status_error = "Aradığınız domain bulunamadı. Lütfen domain adını doğru yazdığından emin olun. <br/> Ayrıca sorun sunucu kaynaklı olabileceği için br süre sonra tekrar deneyebilirsiniz."
#         context = {
#             "status_error": status_error
#         }
#         return render(request, "serp/serp.html", context)





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
            

#--------------------------------------------------------------------------------------------------------------------------
#------------ Mobile Side Data--------------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------------------------------------
            with open("./json_ref/tr_TR.json", "r") as dosya:
                mobile_result_tr = json.load(dosya)

                


            mobile_result = get_seo(domain_name,"mobile")
            # with open("./json/desktop_www.impalabt.com.json", "r") as mobile_dosya:
            #     mobile_result = json.load(mobile_dosya)






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
            desktop_result = get_seo(domain_name,"desktop")

            # with open("./json/desktop_www.impalabt.com.json", "r") as desktop_dosya:
            #     desktop_result = json.load(desktop_dosya)


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

            #------------ --------------------------------------------------------------------------------------------------------------
            
            # print("mobile seo score",mobile_seo_score)
            # print("mobile_performance_score",mobile_performance_score)
            # print("mobile best_practices score",mobile_best_practices_score)
            # print("desktop seo score",desktop_seo_score)
            # print("desktop seo score type",desktop_seo_score)
            # print("desktop_first_contentful_paint",type(desktop_first_contentful_paint))
            # print("desktop_total_blocking_time",type(desktop_total_blocking_time))
            # print("desktop_speed_index",type(desktop_speed_index))
            # print("mobile_minimizes_main_thread_work",mobile_minimizes_main_thread_work)

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


            }
            return JsonResponse(response_data)
        
        else:

            raise ValueError(f"API request failed: {status}")


# def analyze_url(request):
#     if request.method == "POST":
#         domain_name = request.POST.get("domain_name")

#         if not domain_name.startswith(("http://", "https://")):
#             domain_name = f"https://{domain_name}"
#         status = check_url_status(domain_name)
#         print("status----------------------------------------------------------",type(status))
#         if status != 202:
#             print("if1")
#             status_error = "Aradığınız domain bulunamadı. Lütfen domain adını doğru yazdığından emin olun. <br/> Ayrıca sorun sunucu kaynaklı olabileceği için br süre sonra tekrar deneyebilirsiniz."
#             context = {
#                     "status_error": status_error
#             }
#             return render(request, "serp/serp.html", context)

#         if status == 202:
#             print("if 2")
#             urlresponse = requests.get(domain_name, verify=False)
#             content = urlresponse.content
#             soup = BeautifulSoup(content, 'html.parser')
#             sitemap_link = soup.find('a', {'href': '/sitemap.xml'})
#             if sitemap_link:
#                     # Sitemap linkini al
#                     sitemap_url = domain_name + sitemap_link['href']
#                     site_map_response = requests.get(sitemap_url)
#                     soup = BeautifulSoup(site_map_response.text, 'html.parser')
#                     sitemap_link_list = [loc.text for loc in soup.find_all('loc')]
#                     if sitemap_link_list:
#                             url_count = len(sitemap_link_list)
#                             domain_links_score=set()
#                             for url in sitemap_link_list:
#                                 seo_result = get_seo(url)
#                                 score = seo_result['lighthouseResult']["categories"]["performance"]["score"]
#                                 full_link = f"<li>{url} - Score: {score}</li>"
#                                 domain_links_score.add(full_link)
#                             context = {
#                                 "domain_name": domain_name,
#                                 "domain_links_score": domain_links_score,
#                                 "url_count": url_count,
#                             }
#                             return render(request, "serp/serp_result.html", context)
#             else:
            
#                 sitemap_link_list = set()
#                 for link in soup.find_all("a"):
#                     href = link.get("href")
#                     if href and not href.startswith(("http://", "https://")):
#                         full_link = domain_name + href
#                         sitemap_link_list.add(full_link)
#                 url_count = len(sitemap_link_list)
#                 domain_links_score=set()
#                 for url in sitemap_link_list:
#                     seo_result = get_seo(url)
#                     score = seo_result['lighthouseResult']["categories"]["performance"]["score"]
#                     full_link = f"<li>{url} - Score: {score}</li>"
#                     domain_links_score.add(full_link)
#                     context = {
#                         "domain_name": domain_name,
#                         "domain_links_score": domain_links_score,
#                         "url_count": url_count,
#                     }
#                 return render(request, "serp/serp_result.html", context)
#     else:
#         print("else çalıştı")
#         status_error = "Aradığınız domain bulunamadı. Lütfen domain adını doğru yazdığından emin olun. <br/> Ayrıca sorun sunucu kaynaklı olabileceği için br süre sonra tekrar deneyebilirsiniz."
#         context = {
#             "status_error": status_error
#         }
#         return render(request, "serp/serp.html", context)












# def analyze_url(request):
#     if request.method == "POST":
#         domain_name = request.POST.get("domain_name")
#         print("if1")
#         if not domain_name.startswith(("http://", "https://")):
#             domain_name = f"https://{domain_name}"
        
#         try: 
#             print("try")
#             status = check_url_status(domain_name)
#             if status.status_code is not 202:
#                 status_error = "Aradığınız domain bulunamadı. Lütfen domain adını doğru yazdığından emin olun. <br/> Ayrıca sorun sunucu kaynaklı olabileceği için br süre sonra tekrar deneyebilirsiniz."
#                 context = {
#                     "status_error": status_error
#                 }
#                 return render(request, "serp/serp.html", context)

#         except: 
#             print("except")
#             if status is 202:
#                 urlresponse = requests.get(domain_name, verify=False)
#                 content = urlresponse.content
#                 soup = BeautifulSoup(content, 'html.parser')

#                 sitemap_link = soup.find('a', {'href': '/sitemap.xml'})

#                 if sitemap_link:
#                         # Sitemap linkini al
#                         sitemap_url = domain_name + sitemap_link['href']

#                         site_map_response = requests.get(sitemap_url)
#                         soup = BeautifulSoup(site_map_response.text, 'html.parser')
#                         sitemap_link_list = [loc.text for loc in soup.find_all('loc')]
#                         if sitemap_link_list:
#                                 url_count = len(sitemap_link_list)
#                                 domain_links_score=set()
#                                 for url in sitemap_link_list:
#                                     seo_result = get_seo(url)
#                                     score = seo_result['lighthouseResult']["categories"]["performance"]["score"]
#                                     full_link = f"<li>{url} - Score: {score}</li>"
#                                     domain_links_score.add(full_link)
#                                 context = {
#                                     "domain_name": domain_name,
#                                     "domain_links_score": domain_links_score,
#                                     "url_count": url_count,
#                                 }
#                                 return render(request, "serp/serp_result.html", context)
#                 else:
                
#                     sitemap_link_list = set()
#                     for link in soup.find_all("a"):
#                         href = link.get("href")
#                         if href and not href.startswith(("http://", "https://")):
#                             full_link = domain_name + href
#                             sitemap_link_list.add(full_link)
#                     url_count = len(sitemap_link_list)
#                     domain_links_score=set()
#                     for url in sitemap_link_list:
#                         seo_result = get_seo(url)
#                         score = seo_result['lighthouseResult']["categories"]["performance"]["score"]
#                         full_link = f"<li>{url} - Score: {score}</li>"
#                         domain_links_score.add(full_link)
#                         context = {
#                             "domain_name": domain_name,
#                             "domain_links_score": domain_links_score,
#                             "url_count": url_count,
#                         }
#                     return render(request, "serp/serp_result.html", context)
#     else:
#         status_error = "Aradığınız domain bulunamadı. Lütfen domain adını doğru yazdığından emin olun. <br/> Ayrıca sorun sunucu kaynaklı olabileceği için br süre sonra tekrar deneyebilirsiniz."
#         context = {
#             "status_error": status_error
#         }
#         return render(request, "serp/serp.html", context)

        
# #------------------------------------------------------------------------------------------
#         if not domain_name.startswith(("http://", "https://")):
#             domain_name = f"https://{domain_name}"

#         try:
#             seo_result = get_seo(domain_name)
#             score = seo_result['lighthouseResult']["categories"]["performance"]["score"]
            
#         except ValueError as e:
#             status_error = str(e)
#             context = {
#                 "status_error": status_error
#             }
#             return render(request, "serp/serp.html", context)




#         # Sayfadaki linkleri sırala (eğer mevcutsa)
#         if 'links' in seo_result['lighthouseResult']["categories"]["seo"]:
#             links = seo_result['lighthouseResult']["categories"]["seo"]["links"]
#             sorted_links = sorted(links, key=lambda link: link['anchorText'])
#         else:
#             sorted_links = []


#         context = {
#             "domain_name": domain_name,
#             "seo_result": seo_result,
#             "score": score,
#             "sorted_links": sorted_links,
#             # "recommendations": recommendations,
#         }
#         # JSON yanıtını bir dosyaya kaydet
#         current_directory = os.getcwd()
#         file_name = 'json/'+ f"{domain_name.replace('https://', '')}.json"
#         file_path = os.path.join(current_directory, file_name)

#         with open(file_path, "w") as f:
#             json.dump(seo_result, f)



#         return render(request, "serp/serp_result.html", context)
#     else:
#         status_error = "Aradığınız domain bulunamadı. Lütfen domain adını doğru yazdığından emin olun. <br/> Ayrıca sorun sunucu kaynaklı olabileceği için br süre sonra tekrar deneyebilirsiniz."
#         context = {
#             "status_error": status_error
#         }
#         return render(request, "serp/serp.html", context)


































































# def get_seo(domain):
#     url='https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
#     params = {
#         'url':domain,
#         'strategy':"mobile",
#         'key':"AIzaSyBXMVer3CbXtAPA8vGooFlb5loyjE0V-oQ",
#         'category':["performance","seo","accessibility"],
#     }
#     res=requests.get(url,params)
     


#     return res



# def analyze_url(request):
#     if request.method == "POST":
#         domain_name = request.POST.get("domain_name")
#         domain = request.POST.get("domain_name")

    

#         if not domain_name.startswith(("http://", "https://")):
#             domain_name = f"https://{domain_name}"
#         status_errror = ""
#         seo_result=get_seo(domain)

#         # Contexti hazırla
#         context = {
#                 "domain_name": domain_name,

#                 "domain": domain,
#                 "seo_result": seo_result,
#         }
#         return render(request, "serp/serp_result.html", context)
#     else:
#         status_error="Aradığınız domain bulunamadı.Lütfen domain adını doğru yazdığından emin olun. <br/> Ayrıca sorun sunucu kaynaklı olabileceği için br süre sonra tekrar deneyebilirsiniz. "
#         context = {
#             "status_error": status_error
#         }


#     return render(request, "serp/serp.html", context)
