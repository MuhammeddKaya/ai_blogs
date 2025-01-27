


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



#-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
