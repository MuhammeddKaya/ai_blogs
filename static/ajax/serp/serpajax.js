
$(document).on('click', '.serp-analyze-link', function (event) {
  // Butonun id'sini ve linkini al



  var link = $("#input-search").val();
  var checkresultdiv = $("#hidden-result-div").attr("class");
  if (!checkresultdiv) {
    $('#hidden-result-div').addClass('d-none');
  }

  console.log("serp analyze çalıştı");
  console.log(link);

  // Link girilmediyse uyarı ver
  // var linkFormat = /^https?:\/\/[-a-zA-Z0-9@:%._\\+~#?&//=]*$/;
  // if (!linkFormat.test(link)) {
  //   alert("Lütfen geçerli bir link giriniz.");
  //   return;
  // }
  if (!link) {
    alert("Lütfen bir link giriniz.");
    return;
  }

  // hidden-initial-div div'ini gizle
  $("#hidden-initial-div").addClass("d-none");
  // hidden-progress-div div'ini göster
  $("#hidden-progress-div").removeClass("d-none");
  $('#seo-link').text("Analyzing "+ link);




  // AJAX isteğini gönder
  $.ajax({
    type: "GET",
    url: "link_analyze/",
    dataType: 'json',
    data: {
      link: link
    },
    success: function (data) {
      console.log("success");


      // hidden-progress-div div'ini gizle
      $("#hidden-progress-div").addClass("d-none");


      $('#hidden-result-div').removeClass('d-none');

      var mobile_fullPageScreenshot = data.mobile_fullPageScreenshot
      var $mobileImage = $('<img/>').attr('src', mobile_fullPageScreenshot);
      $("#mobile_fullPageScreenshot-div").empty();
      $("#mobile_fullPageScreenshot-div").append($mobileImage);
      $mobileImage.css({
        'max-width': '100%',
        'height': 'auto',
        'max-height': '300px',
        'overflow': 'hidden',
      });
      
      var desktop_fullPageScreenshot = data.desktop_fullPageScreenshot
      var $desktopImage = $('<img/>').attr('src', desktop_fullPageScreenshot);
      $("#desktop_fullPageScreenshot-div").empty();
      $("#desktop_fullPageScreenshot-div").append($desktopImage);
      $desktopImage.css({
        'max-width': '100%',
        'height': 'auto',
        'max-height': '300px',
        'overflow': 'hidden',
      });

      
      function updateChart(chart, data) {
        var score = data.toFixed(3) * 100;
        var color;
    
        if (score > 85) {
            color = "#00ff00";
        } else if (score >= 50) {
            color = "#ffc04d";
        } else {
            color = "#ff0000";
        }
    
        console.log(score);
    
        chart.updateOptions({
            series: [score],
            colors: [color],
        });
      }


//----------------------------------------------------------------------------------
//------------------------------Charts----------------------------------------------
//----------------------------------------------------------------------------------

      // Her bir grafik için işlevi kullanarak güncelleme yapın
      updateChart(mobile_performance_score_chart, data.mobile_performance_score);
      updateChart(mobile_accessibility_score_chart, data.mobile_accessibility_score);
      updateChart(mobile_seo_score_chart, data.mobile_seo_score);
      updateChart(mobile_best_practices_score_chart, data.mobile_best_practices_score);
      updateChart(desktop_performance_score_chart, data.desktop_performance_score);
      updateChart(desktop_accessibility_score_chart, data.desktop_accessibility_score);
      updateChart(desktop_seo_score_chart, data.desktop_seo_score);
      updateChart(desktop_best_practices_score_chart, data.desktop_best_practices_score);


      updateChart(mobile_performance_score_big_chart, data.mobile_performance_score);
      updateChart(mobile_accessibility_score_big_chart, data.mobile_accessibility_score);
      updateChart(mobile_seo_score_big_chart, data.mobile_seo_score);
      updateChart(mobile_best_practices_score_big_chart, data.mobile_best_practices_score);
      updateChart(desktop_performance_score_big_chart, data.desktop_performance_score);
      updateChart(desktop_accessibility_score_big_chart, data.desktop_accessibility_score);
      updateChart(desktop_seo_score_big_chart, data.desktop_seo_score);
      updateChart(desktop_best_practices_score_big_chart, data.desktop_best_practices_score);
    


//----------------------------------------------------------------------------------
//------------------------DESKTOP SİDE-----------------------------------------------
//----------------------------------------------------------------------------------

      //FIRST CONTENTFULL PAİNT
      var desktop_first_contentful_paint = data.desktop_first_contentful_paint;
      var $desktopFirstContentfulPaint = $(".desktop_first_contentful_paint");
      
      // FCP süresine göre renk belirleme
      if (desktop_first_contentful_paint >= 0 && desktop_first_contentful_paint <= 1.8) {
        $desktopFirstContentfulPaint.css("color", "green"); // Yeşil (hızlı)
      } else if (desktop_first_contentful_paint > 1.8 && desktop_first_contentful_paint <= 3) {
        $desktopFirstContentfulPaint.css("color", "orange"); // Turuncu (orta)
      } else {
        $desktopFirstContentfulPaint.css("color", "red"); // Kırmızı (yavaş)
      }
      $desktopFirstContentfulPaint.text(desktop_first_contentful_paint);

      //LARGEST CONTENTFULL PAİNT
      var desktop_largest_contentful_paint = data.desktop_largest_contentful_paint;
      var $desktopLargestContentfulPaint = $(".desktop_largest_contentful_paint");
      
      if (desktop_largest_contentful_paint >= 0 && desktop_largest_contentful_paint <= 2.5) {
          $desktopLargestContentfulPaint.css("color", "green"); // Yeşil (hızlı)
      } else if (desktop_largest_contentful_paint > 2.5 && desktop_largest_contentful_paint <= 4) {
          $desktopLargestContentfulPaint.css("color", "orange"); // Turuncu (orta)
      } else {
          $desktopLargestContentfulPaint.css("color", "red"); // Kırmızı (yavaş)
      }
      $desktopLargestContentfulPaint.text(desktop_largest_contentful_paint);


      //TOTAL BLOCKİNG TİME
      var desktop_total_blocking_time = data.desktop_total_blocking_time;
      var $desktopTotalBlockingTime = $(".desktop_total_blocking_time");
      console.log(desktop_total_blocking_time, "total blocking time");
      
      if (desktop_total_blocking_time >= 0 && desktop_total_blocking_time <= 200) {
          $desktopTotalBlockingTime.css("color", "green"); // Yeşil (hızlı)
      } else if (desktop_total_blocking_time > 200 && desktop_total_blocking_time <= 600) {
          $desktopTotalBlockingTime.css("color", "orange"); // Turuncu (orta)
      } else {
          $desktopTotalBlockingTime.css("color", "red"); // Kırmızı (yavaş)
      }
      $desktopTotalBlockingTime.text(desktop_total_blocking_time);



      // Cumulative Layout Shift
      var desktop_cumulative_layout_shift = data.desktop_cumulative_layout_shift;
      var $desktopCumulativeLayoutShift = $(".desktop_cumulative_layout_shift");

      if (desktop_cumulative_layout_shift >= 0 && desktop_cumulative_layout_shift <= 0.1) {
        $desktopCumulativeLayoutShift.css("color", "green"); // Yeşil (iyi)
      } else if (desktop_cumulative_layout_shift > 0.1 && desktop_cumulative_layout_shift <= 0.25) {
        $desktopCumulativeLayoutShift.css("color", "orange"); // Turuncu (orta)
      } else {
        $desktopCumulativeLayoutShift.css("color", "red"); // Kırmızı (kötü)
      }

      $desktopCumulativeLayoutShift.text(desktop_cumulative_layout_shift);


      // Speed Index
      var desktop_speed_index = data.desktop_speed_index;
      console.log(desktop_speed_index,"desktop speed index")
      var $desktopSpeedIndex = $(".desktop_speed_index");

      if (desktop_speed_index >= 0 && desktop_speed_index <= 3.4) {
        $desktopSpeedIndex.css("color", "green"); // Yeşil (hızlı)
      } else if (desktop_speed_index > 3.4 && desktop_speed_index <= 5.8) {
        $desktopSpeedIndex.css("color", "orange"); // Turuncu (orta)
      } else {
        $desktopSpeedIndex.css("color", "red"); // Kırmızı (yavaş)
      }

      $desktopSpeedIndex.text(desktop_speed_index);

//------------------------DESKTOP SİDE  DIAGNOSTICS-----------------------------------------------





//----------------------------------------------------------------------------------
//------------------------MOBİLE SİDE-----------------------------------------------
//----------------------------------------------------------------------------------

      //FIRST CONTENTFULL PAİNT
      var mobile_first_contentful_paint = data.mobile_first_contentful_paint;
      var $mobileFirstContentfulPaint = $(".mobile_first_contentful_paint");
      
      // FCP süresine göre renk belirleme
      if (mobile_first_contentful_paint >= 0 && mobile_first_contentful_paint <= 1.8) {
        $mobileFirstContentfulPaint.css("color", "green"); // Yeşil (hızlı)
      } else if (mobile_first_contentful_paint > 1.8 && mobile_first_contentful_paint <= 3) {
        $mobileFirstContentfulPaint.css("color", "orange"); // Turuncu (orta)
      } else {
        $mobileFirstContentfulPaint.css("color", "red"); // Kırmızı (yavaş)
      }
      
      $mobileFirstContentfulPaint.text(mobile_first_contentful_paint);


      //LARGEST CONTENTFULL PAİNT
      var mobile_largest_contentful_paint = data.mobile_largest_contentful_paint;
      var $mobileLargestContentfulPaint = $(".mobile_largest_contentful_paint");

      if (mobile_largest_contentful_paint >= 0 && mobile_largest_contentful_paint <= 2.5) {
        $mobileLargestContentfulPaint.css("color", "green"); // Yeşil (hızlı)
      } else if (mobile_argest_contentful_paint > 2.5 && mobile_largest_contentful_paint <= 4) {
        $mobileLargestContentfulPaint.css("color", "orange"); // Turuncu (orta)
      } else {
        $mobileLargestContentfulPaint.css("color", "red"); // Kırmızı (yavaş)
      }
      $mobileLargestContentfulPaint.text(mobile_largest_contentful_paint);


      //TOTAL BLOCKİNG TİME
      var mobile_total_blocking_time = data.mobile_total_blocking_time;
      var $mobileTotalBockingTime = $(".mobile_total_blocking_time");
      if (mobile_total_blocking_time >= 0 && mobile_total_blocking_time <= 200) {
        $mobileTotalBockingTime.css("color", "green"); // Yeşil (hızlı)
      } else if (mobile_total_blocking_time > 200 && mobile_total_blocking_time <= 600) {
        $mobileTotalBockingTime.css("color", "orange"); // Turuncu (orta)
      } else {
        $mobileTotalBockingTime.css("color", "red"); // Kırmızı (yavaş)
      }
      $mobileTotalBockingTime.text(mobile_total_blocking_time);


      // Cumulative Layout Shift
      var mobile_cumulative_layout_shift = data.mobile_cumulative_layout_shift;
      var $mobileCumulativeLayoutShift = $(".mobile_cumulative_layout_shift");

      if (mobile_cumulative_layout_shift >= 0 && mobile_cumulative_layout_shift <= 0.1) {
        $mobileCumulativeLayoutShift.css("color", "green"); // Yeşil (iyi)
      } else if (mobile_cumulative_layout_shift > 0.1 && mobile_cumulative_layout_shift <= 0.25) {
        $mobileCumulativeLayoutShift.css("color", "orange"); // Turuncu (orta)
      } else {
        $mobileCumulativeLayoutShift.css("color", "red"); // Kırmızı (kötü)
      }

      $mobileCumulativeLayoutShift.text(mobile_cumulative_layout_shift);


      // Speed Index
      var mobile_speed_index = data.mobile_speed_index;
      var $mobileSpeedIndex = $(".mobile_speed_index");

      if (mobile_speed_index >= 0 && mobile_speed_index <= 3.4) {
        $mobileSpeedIndex.css("color", "green"); // Yeşil (hızlı)
      } else if (mobile_speed_index > 3.4 && mobile_speed_index <= 5.8) {
        $mobileSpeedIndex.css("color", "orange"); // Turuncu (orta)
      } else {
        $mobileSpeedIndex.css("color", "red"); // Kırmızı (yavaş)
      }

      $mobileSpeedIndex.text(mobile_speed_index);

//------------------------ALL Audits-----------------------------------------------
      var mobile_audits  = data.mobile_audit; 
      var desktop_audits = data.desktop_audit; 
      var audits_tr      = data.audit_tr; 
      // console.log(audits)
      var lang_code;

      $("#mobile_lang_tr, #mobile_lang_en, #desktop_lang_tr, #desktop_lang_en").click(function() {
        lang_code = this.id.includes('tr') ? 'tr' : 'en';
        console.log(lang_code,"langkodeeeeeee");
        updateData();
    });

      $(document).ready(function() {
        updateData();
      });


      function checkAndHideEmptyDivs() {
        // Tüm kategori div'lerini kontrol et
        const categories = [
          '.mobile_best_practices_passed_audits',
          '.mobile_best_practices_not_applicable_audits',
          '.mobile_best_practices_trust_and_safety_audits',
          '.mobile_best_practices_general_audits',
          '.mobile_best_practices_user_experience_audits',
          '.mobile_seo_passed_audits',
          '.mobile_seo_not_applicable_audits',
          '.mobile_seo_crawl_and_indexing_audits',
          '.mobile_seo_content_best_practices_audits',
          '.mobile_seo_mobile_friendly_audits',
          '.mobile_seo_add_item_to_manually_check_audits',
          '.mobile_performance_passed_audits',
          '.mobile_performance_diagnostic_audits',
          '.mobile_accessibility_passed_audits',
          '.mobile_accessibility_add_manual_check_audits',
          '.mobile_accessibility_not_applicable_audits',
          '.mobile_accessibility_names_and_labels_audits',
          '.mobile_accessibility_navigation_audits',
          '.mobile_accessibility_contrast_audits',
          '.mobile_accessibility_tables_lists_audits',
          '.mobile_accessibility_aria_audits',


          '.desktop_best_practices_passed_audits',
          '.desktop_best_practices_not_applicable_audits',
          '.desktop_best_practices_trust_and_safety_audits',
          '.desktop_best_practices_general_audits',
          '.desktop_best_practices_user_experience_audits',
          '.desktop_seo_passed_audits',
          '.desktop_seo_not_applicable_audits',
          '.desktop_seo_crawl_and_indexing_audits',
          '.desktop_seo_content_best_practices_audits',
          '.desktop_seo_desktop_friendly_audits',
          '.desktop_seo_add_item_to_manually_check_audits',
          '.desktop_performance_passed_audits',
          '.desktop_performance_diagnostic_audits',
          '.desktop_accessibility_passed_audits',
          '.desktop_accessibility_add_manual_check_audits',
          '.desktop_accessibility_not_applicable_audits',
          '.desktop_accessibility_names_and_labels_audits',
          '.desktop_accessibility_navigation_audits',
          '.desktop_accessibility_contrast_audits',
          '.desktop_accessibility_tables_lists_audits',
          '.desktop_accessibility_aria_audits'
        ];
    
        categories.forEach(function(category) {
            if ($(category).children().length === 0) {
                // Eğer div boşsa, üst konteynırı gizle (örneğin .card-body)
                $(category).closest('.card-body').hide();
            }
        });
      }

      function clearContents() {
        // İlgili HTML elemanlarını temizle
        $('.mobile_best_practices_passed_audits').empty();
        $('.mobile_best_practices_not_applicable_audits').empty();
        $('.mobile_best_practices_trust_and_safety_audits').empty();
        $('.mobile_best_practices_general_audits').empty();
        $('.mobile_best_practices_user_experience_audits').empty();
    
        $('.mobile_seo_passed_audits').empty();
        $('.mobile_seo_not_applicable_audits').empty();
        $('.mobile_seo_crawl_and_indexing_audits').empty();
        $('.mobile_seo_content_best_practices_audits').empty();
        $('.mobile_seo_mobile_friendly_audits').empty();
        $('.mobile_seo_add_item_to_manually_check_audits').empty();
    
        $('.mobile_performance_passed_audits').empty();
        $('.mobile_performance_diagnostic_audits').empty();
    
        $('.mobile_accessibility_passed_audits').empty();
        $('.mobile_accessibility_add_manual_check_audits').empty();
        $('.mobile_accessibility_not_applicable_audits').empty();
        $('.mobile_accessibility_names_and_labels_audits').empty();
        $('.mobile_accessibility_navigation_audits').empty();
        $('.mobile_accessibility_contrast_audits').empty();
        $('.mobile_accessibility_tables_lists_audits').empty();
        $('.mobile_accessibility_aria_audits').empty();



        $('.desktop_best_practices_passed_audits').empty();
        $('.desktop_best_practices_not_applicable_audits').empty();
        $('.desktop_best_practices_trust_and_safety_audits').empty();
        $('.desktop_best_practices_general_audits').empty();
        $('.desktop_best_practices_user_experience_audits').empty();
    
        $('.desktop_seo_passed_audits').empty();
        $('.desktop_seo_not_applicable_audits').empty();
        $('.desktop_seo_crawl_and_indexing_audits').empty();
        $('.desktop_seo_content_best_practices_audits').empty();
        $('.desktop_seo_mobile_friendly_audits').empty();
        $('.desktop_seo_add_item_to_manually_check_audits').empty();
    
        $('.desktop_performance_passed_audits').empty();
        $('.desktop_performance_diagnostic_audits').empty();
    
        $('.desktop_accessibility_passed_audits').empty();
        $('.desktop_accessibility_add_manual_check_audits').empty();
        $('.desktop_accessibility_not_applicable_audits').empty();
        $('.desktop_accessibility_names_and_labels_audits').empty();
        $('.desktop_accessibility_navigation_audits').empty();
        $('.desktop_accessibility_contrast_audits').empty();
        $('.desktop_accessibility_tables_lists_audits').empty();
        $('.desktop_accessibility_aria_audits').empty();
      }

      function updateData() {
        clearContents();

        for (var key in mobile_audits) {

          var mobile_audit_id = mobile_audits[key].id;
          var mobile_audit_score = mobile_audits[key].score;
          var mobile_audit_score_display_mode = mobile_audits[key].scoreDisplayMode;
          var audit_tr_title = audits_tr[mobile_audit_id];


          if (lang_code == "tr") {
            if (audits_tr.hasOwnProperty(mobile_audit_id)) {
                var mobile_audit_ttitle = audits_tr[mobile_audit_id].title;
                var mobile_audit_title = mobile_audit_ttitle.replace(/<[^>]+>/g, function(match) {
                    return match.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
                });

        
                var tdescription = audits_tr[mobile_audit_id].description;
                var description = tdescription.replace(/<[^>]+>/g, function(match) {
                    return match.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
                }).replace(/\[[^\]]*\]|\([^\)]*\)/g, '');
            } else {
                console.log('Translation missing for mobile_audit ID:', mobile_audit_id);
                continue; // Bu ID için çeviri yoksa döngünün bu adımını atla
            }
          }
          else {
            
            var mobile_audit_ttitle = mobile_audits[key].title;
            var mobile_audit_title = mobile_audit_ttitle.replace(/<[^>]+>/g, function(match) {
              return match.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
            });

            var tdescription = mobile_audits[key].description;
            var description = tdescription.replace(/<[^>]+>/g, function(match) {
              return match.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
            }).replace(/\[[^\]]*\]|\([^\)]*\)/g, '');
          }
          

          

          // HTML içeriğini oluştur
          var html =                 '<div class="accordion accordion-flush mb-1 card position-relative overflow-hidden" id="accordionFlushExample">'+
                    '<div class="accordion-item">'+
                      '<h2 class="accordion-header" id="flush-headingOne">'+
                        '<button class="accordion-button collapsed fs-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#'+'mobile'+mobile_audit_id+'" aria-expanded="false" aria-controls="'+'mobile'+mobile_audit_id+'">'+
                          '<div class="row">'+
                          ' <div class="row">'+
                              '<h6>'+mobile_audit_title+'</h6>'+
                            '</div>'+
                            '<div class="row">'+
                              '<div class="'+'mobile'+mobile_audit_id+'"></div>'+
                            '</div>'+
                          '</div>'+
                        '</button>'+
                      '</h2>'+
                      '<div id="'+'mobile'+mobile_audit_id+'" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">'+
                        '<div class="accordion-body fw-normal">'+description+
                        '</div>'+
                        '<div> <!--'+
                          '<table class="table border mb-0" id="mobile_minimizes_main_thread_work_table">'+
                            '<thead>'+
                              '<tr>'+
                              ' <th scope="col">Category</th>'+
                                '<th scope="col">Duration (ms)</th>'+
                              '</tr>'+
                            '</thead>'+
                            '<tbody>'+

                            '</tbody>'+
                          '</table>'+
                        '</div> -->'+
                      '</div>'+
                    '</div>'+

                  '</div>';

          var seoAudits = ["crawlable-anchors", "image-alt", "structured-data", "viewport", "document-title", "meta-description", "http-status-code", 
              "link-text", "is-crawlable", "hreflang", "font-size", "plugins", "tap-targets", "robots-txt", "canonical"];

          var bestPractices = [
              "image-size-responsive", "csp-xss",   "js-libraries", "is-on-https", "deprecations", "paste-preventing-inputs",  "geolocation-on-start",
              "notification-on-start", "image-aspect-ratio","doctype", "charset",  "no-unload-listeners","errors-in-console",    "inspector-issues",
              "valid-source-maps","preload-fonts", "third-party-cookies"
          ];
          var performanceAudits = ["largest-contentful-paint-element", "mainthread-work-breakdown", "bootup-time", "third-party-facades", "render-blocking-resources", 
              "lcp-lazy-loaded", "unused-css-rules", "layout-shift-elements", "third-party-summary", "unminified-css", "modern-image-formats", "unsized-images", "uses-long-cache-ttl", 
              "font-display", "legacy-javascript", "unused-javascript", "server-response-time", "non-composited-animations", "total-byte-weight", "dom-size", "critical-request-chains",
              "long-tasks", "offscreen-images", "unminified-javascript", "uses-optimized-images", "uses-rel-preconnect", "redirects", "uses-rel-preload", "efficient-animated-content", 
              "duplicated-javascript", "prioritize-lcp-image", "user-timings", "uses-passive-event-listeners", "no-document-write", "viewport", "uses-text-compression", "uses-responsive-images"];

          var accessibilityAudits = ["button-name", "image-alt", "link-name", "color-contrast", "heading-order", "focusable-controls", "interactive-element-affordance", "logical-tab-order", 
              "visual-order-follows-dom", "focus-traps", "managed-focus", "use-landmarks", "offscreen-content-hidden", "custom-controls-labels", "custom-controls-roles", "aria-hidden-body", 
              "meta-viewport", "aria-hidden-focus", "document-title", "html-has-lang", "valid-lang", "image-redundant-alt", "accesskeys", "aria-allowed-attr", "aria-allowed-role", "aria-command-name",
              "aria-dialog-name", "aria-input-field-name", "aria-meter-name", "aria-required-children", "aria-progressbar-name", "aria-required-attr", "aria-required-parent", "aria-roles", "aria-text", 
              "aria-toggle-field-name", "aria-valid-attr", "aria-tooltip-name", "aria-treeitem-name", "duplicate-id-aria", "aria-valid-attr-value", "bypass", "definition-list", "dlitem", 
              "duplicate-id-active", "form-field-multiple-labels", "html-xml-lang-mismatch", "input-button-name", "input-image-alt", "label", "link-in-text-block", "list", "listitem", "meta-refresh", 
              "object-alt", "select-name", "skip-link", "tabindex", "table-duplicate-name", "td-headers-attr", "th-has-data-cells", "video-caption", "empty-heading", "identical-links-same-purpose",
              "target-size", "label-content-name-mismatch", "table-fake-caption", "td-has-header", "html-lang-valid", "frame-title"];
          
            
          // Audit'in listemizde olup olmadığını kontrol et
          if (bestPractices.includes(mobile_audit_id)) {

              if (mobile_audit_score==1){
                $('.mobile_best_practices_passed_audits').append(html);
              }
              else if (mobile_audit_score==null){
                $('.mobile_best_practices_not_applicable_audits').append(html);
              }
              else if (!(mobile_audit_score == 1) && ['csp-xss'].includes(mobile_audit_id)) {
                $('.mobile_best_practices_trust_and_safety_audits').append(html);
              }
              else if (!(mobile_audit_score == 1) && ['inspector-issues','js-libraries','valid-source-maps'].includes(mobile_audit_id)) {
                $('.mobile_best_practices_general_audits').append(html);
              }
              else if (!(mobile_audit_score == 1) && ['image-aspect-ratio'].includes(mobile_audit_id)) {
                $('.mobile_best_practices_user_experience_audits').append(html);
              }
              else {
                console.log("best practices kategoriye uymayan audit",mobile_audit_id);
              } 

          } else if (seoAudits.includes(mobile_audit_id)) {
              if (mobile_audit_score==1){
                $('.mobile_seo_passed_audits').append(html);
              }
              else if (mobile_audit_score==null){
                $('.mobile_seo_not_applicable_audits').append(html);
              }
              else if (!(mobile_audit_score == 1) && ['crawlable-anchors'].includes(mobile_audit_id)) {
                $('.mobile_seo_crawl_and_indexing_audits').append(html);
              }
              else if (!(mobile_audit_score == 1) && ['image-alt'].includes(mobile_audit_id)) {
                $('.mobile_seo_content_best_practices_audits').append(html);
              }
              else if (!(mobile_audit_score == 1) && ['tap-targets'].includes(mobile_audit_id)) {
                $('.mobile_seo_mobile_friendly_audits').append(html);
              }
              else if (!(mobile_audit_score == 1) && ['structured-data'].includes(mobile_audit_id)) {
                $('.mobile_seo_add_item_to_manually_check_audits').append(html);
              }
              else {
                console.log("Seo kategoriye uymayan audit",mobile_audit_id);
              } 

          } else if (performanceAudits.includes(mobile_audit_id)) {
              if (mobile_audit_score==1){
                $('.mobile_performance_passed_audits').append(html);
              }
              else {
                $('.mobile_performance_diagnostic_audits').append(html);
              }

          } else if (accessibilityAudits.includes(mobile_audit_id)) {

              if (mobile_audit_score==1){
                $('.mobile_accessibility_passed_audits').append(html);
              }

              else if (mobile_audit_score_display_mode=='manual'){
                $('.mobile_accessibility_add_manual_check_audits').append(html);
              }

              else if (mobile_audit_score_display_mode=='notApplicable'){
                $('.mobile_accessibility_not_applicable_audits').append(html);
              }

              else if (!(mobile_audit_score==1) && (mobile_audit_id=='button-name'|| mobile_audit_id=='link-name'||mobile_audit_id=='image-alt')){
                $('.mobile_accessibility_names_and_labels_audits').append(html);
              }

              else if (!(mobile_audit_score==1) && (mobile_audit_id=='heading-order')){
                $('.mobile_accessibility_navigation_audits').append(html);
              }

              else if (!(mobile_audit_score==1) && (mobile_audit_id=='color-contrast')){
                $('.mobile_accessibility_contrast_audits').append(html);
              }
              else if (!(mobile_audit_score==1) && (mobile_audit_id=='list'|| mobile_audit_id=='listitem')){
                $('.mobile_accessibility_tables_lists_audits').append(html);
              }
              else if (!(mobile_audit_score==1) && (mobile_audit_id=='list'|| mobile_audit_id=='listitem')){
                $('.mobile_accessibility_aria_audits').append(html);
              }
              else if (!(mobile_audit_score == 1) && ['aria-allowed-attr', 'aria-allowed-role', 'aria-command-name', 'aria-dialog-name', 'aria-input-field-name', 'aria-meter-name', 'aria-required-children', 'aria-progressbar-name', 'aria-required-attr', 'aria-required-parent', 'aria-roles', 'aria-text', 'aria-toggle-field-name', 'aria-valid-attr', 'aria-tooltip-name', 'aria-treeitem-name', 'duplicate-id-aria', 'aria-valid-attr-value', 'aria-hidden-body', 'aria-hidden-focus'].includes(mobile_audit_id)) {
                $('.mobile_accessibility_aria_audits').append(html);
              }
                      
              else {
                console.log("accessibility kategoriye uymayan audit",mobile_audit_id);
              }

          }  else {

                console.log(mobile_audit_id);
          }
          
        }



        for (var key in desktop_audits) {

          var desktop_audit_id = desktop_audits[key].id;
          var desktop_audit_score = desktop_audits[key].score;
          var desktop_audit_score_display_mode = desktop_audits[key].scoreDisplayMode;
          var audit_tr_title = audits_tr[desktop_audit_id];


          if (lang_code == "tr") {
            if (audits_tr.hasOwnProperty(desktop_audit_id)) {
                var desktop_audit_ttitle = audits_tr[desktop_audit_id].title;
                var desktop_audit_title = desktop_audit_ttitle.replace(/<[^>]+>/g, function(match) {
                    return match.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
                });

        
                var tdescription = audits_tr[desktop_audit_id].description;
                var description = tdescription.replace(/<[^>]+>/g, function(match) {
                    return match.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
                }).replace(/\[[^\]]*\]|\([^\)]*\)/g, '');
            } else {
                console.log('Translation missing for desktop_audit ID:', desktop_audit_id);
                continue; // Bu ID için çeviri yoksa döngünün bu adımını atla
            }
          }
          else {
            
            var desktop_audit_ttitle = desktop_audits[key].title;
            var desktop_audit_title = desktop_audit_ttitle.replace(/<[^>]+>/g, function(match) {
              return match.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
            });

            var tdescription = desktop_audits[key].description;
            var description = tdescription.replace(/<[^>]+>/g, function(match) {
              return match.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
            }).replace(/\[[^\]]*\]|\([^\)]*\)/g, '');
          }
          

          

          // HTML içeriğini oluştur
          var html =                 '<div class="accordion accordion-flush mb-1 card position-relative overflow-hidden" id="accordionFlushExample">'+
                    '<div class="accordion-item">'+
                      '<h2 class="accordion-header" id="flush-headingOne">'+
                        '<button class="accordion-button collapsed fs-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#'+'desktop'+desktop_audit_id+'" aria-expanded="false" aria-controls="'+'desktop'+desktop_audit_id+'">'+
                          '<div class="row">'+
                          ' <div class="row">'+
                              '<h6>'+desktop_audit_title+'</h6>'+
                            '</div>'+
                            '<div class="row">'+
                              '<div class="'+'desktop'+desktop_audit_id+'"></div>'+
                            '</div>'+
                          '</div>'+
                        '</button>'+
                      '</h2>'+
                      '<div id="'+'desktop'+desktop_audit_id+'" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">'+
                        '<div class="accordion-body fw-normal">'+description+
                        '</div>'+
                        '<div> <!--'+
                          '<table class="table border mb-0" id="mobile_minimizes_main_thread_work_table">'+
                            '<thead>'+
                              '<tr>'+
                              ' <th scope="col">Category</th>'+
                                '<th scope="col">Duration (ms)</th>'+
                              '</tr>'+
                            '</thead>'+
                            '<tbody>'+

                            '</tbody>'+
                          '</table>'+
                        '</div> -->'+
                      '</div>'+
                    '</div>'+

                  '</div>';

          var seoAudits = ["crawlable-anchors", "image-alt", "structured-data", "viewport", "document-title", "meta-description", "http-status-code", 
              "link-text", "is-crawlable", "hreflang", "font-size", "plugins", "tap-targets", "robots-txt", "canonical"];

          var bestPractices = [
              "image-size-responsive", "csp-xss",   "js-libraries", "is-on-https", "deprecations", "paste-preventing-inputs",  "geolocation-on-start",
              "notification-on-start", "image-aspect-ratio","doctype", "charset",  "no-unload-listeners","errors-in-console",    "inspector-issues",
              "valid-source-maps","preload-fonts", "third-party-cookies"
          ];
          var performanceAudits = ["largest-contentful-paint-element", "mainthread-work-breakdown", "bootup-time", "third-party-facades", "render-blocking-resources", 
              "lcp-lazy-loaded", "unused-css-rules", "layout-shift-elements", "third-party-summary", "unminified-css", "modern-image-formats", "unsized-images", "uses-long-cache-ttl", 
              "font-display", "legacy-javascript", "unused-javascript", "server-response-time", "non-composited-animations", "total-byte-weight", "dom-size", "critical-request-chains",
              "long-tasks", "offscreen-images", "unminified-javascript", "uses-optimized-images", "uses-rel-preconnect", "redirects", "uses-rel-preload", "efficient-animated-content", 
              "duplicated-javascript", "prioritize-lcp-image", "user-timings", "uses-passive-event-listeners", "no-document-write", "viewport", "uses-text-compression", "uses-responsive-images"];

          var accessibilityAudits = ["button-name", "image-alt", "link-name", "color-contrast", "heading-order", "focusable-controls", "interactive-element-affordance", "logical-tab-order", 
              "visual-order-follows-dom", "focus-traps", "managed-focus", "use-landmarks", "offscreen-content-hidden", "custom-controls-labels", "custom-controls-roles", "aria-hidden-body", 
              "meta-viewport", "aria-hidden-focus", "document-title", "html-has-lang", "valid-lang", "image-redundant-alt", "accesskeys", "aria-allowed-attr", "aria-allowed-role", "aria-command-name",
              "aria-dialog-name", "aria-input-field-name", "aria-meter-name", "aria-required-children", "aria-progressbar-name", "aria-required-attr", "aria-required-parent", "aria-roles", "aria-text", 
              "aria-toggle-field-name", "aria-valid-attr", "aria-tooltip-name", "aria-treeitem-name", "duplicate-id-aria", "aria-valid-attr-value", "bypass", "definition-list", "dlitem", 
              "duplicate-id-active", "form-field-multiple-labels", "html-xml-lang-mismatch", "input-button-name", "input-image-alt", "label", "link-in-text-block", "list", "listitem", "meta-refresh", 
              "object-alt", "select-name", "skip-link", "tabindex", "table-duplicate-name", "td-headers-attr", "th-has-data-cells", "video-caption", "empty-heading", "identical-links-same-purpose",
              "target-size", "label-content-name-mismatch", "table-fake-caption", "td-has-header", "html-lang-valid", "frame-title"];
          
            
          // Audit'in listemizde olup olmadığını kontrol et
          if (bestPractices.includes(desktop_audit_id)) {

              if (desktop_audit_score==1){
                $('.desktop_best_practices_passed_audits').append(html);
              }
              else if (desktop_audit_score==null){
                $('.desktop_best_practices_not_applicable_audits').append(html);
              }
              else if (!(desktop_audit_score == 1) && ['csp-xss'].includes(desktop_audit_id)) {
                $('.desktop_best_practices_trust_and_safety_audits').append(html);
              }
              else if (!(desktop_audit_score == 1) && ['inspector-issues','js-libraries','valid-source-maps'].includes(desktop_audit_id)) {
                $('.desktop_best_practices_general_audits').append(html);
              }
              else if (!(desktop_audit_score == 1) && ['image-aspect-ratio'].includes(desktop_audit_id)) {
                $('.desktop_best_practices_user_experience_audits').append(html);
              }
              else {
                console.log("best practices kategoriye uymayan audit",desktop_audit_id);
              } 

          } else if (seoAudits.includes(desktop_audit_id)) {
              if (desktop_audit_score==1){
                $('.desktop_seo_passed_audits').append(html);
              }
              else if (desktop_audit_score==null){
                $('.desktop_seo_not_applicable_audits').append(html);
              }
              else if (!(desktop_audit_score == 1) && ['crawlable-anchors'].includes(desktop_audit_id)) {
                $('.desktop_seo_crawl_and_indexing_audits').append(html);
              }
              else if (!(desktop_audit_score == 1) && ['image-alt'].includes(desktop_audit_id)) {
                $('.desktop_seo_content_best_practices_audits').append(html);
              }
              else if (!(desktop_audit_score == 1) && ['tap-targets'].includes(desktop_audit_id)) {
                $('.desktop_seo_desktop_friendly_audits').append(html);
              }
              else if (!(desktop_audit_score == 1) && ['structured-data'].includes(desktop_audit_id)) {
                $('.desktop_seo_add_item_to_manually_check_audits').append(html);
              }
              else {
                console.log("Seo kategoriye uymayan audit",desktop_audit_id);
              } 

          } else if (performanceAudits.includes(desktop_audit_id)) {
              if (desktop_audit_score==1){
                $('.desktop_performance_passed_audits').append(html);
              }
              else {
                $('.desktop_performance_diagnostic_audits').append(html);
              }

          } else if (accessibilityAudits.includes(desktop_audit_id)) {

              if (desktop_audit_score==1){
                $('.desktop_accessibility_passed_audits').append(html);
              }

              else if (desktop_audit_score_display_mode=='manual'){
                $('.desktop_accessibility_add_manual_check_audits').append(html);
              }

              else if (desktop_audit_score_display_mode=='notApplicable'){
                $('.desktop_accessibility_not_applicable_audits').append(html);
              }

              else if (!(desktop_audit_score==1) && (desktop_audit_id=='button-name'|| desktop_audit_id=='link-name'||desktop_audit_id=='image-alt')){
                $('.desktop_accessibility_names_and_labels_audits').append(html);
              }

              else if (!(desktop_audit_score==1) && (desktop_audit_id=='heading-order')){
                $('.desktop_accessibility_navigation_audits').append(html);
              }

              else if (!(desktop_audit_score==1) && (desktop_audit_id=='color-contrast')){
                $('.desktop_accessibility_contrast_audits').append(html);
              }
              else if (!(desktop_audit_score==1) && (desktop_audit_id=='list'|| desktop_audit_id=='listitem')){
                $('.desktop_accessibility_tables_lists_audits').append(html);
              }
              else if (!(desktop_audit_score==1) && (desktop_audit_id=='list'|| desktop_audit_id=='listitem')){
                $('.desktop_accessibility_aria_audits').append(html);
              }
              else if (!(desktop_audit_score == 1) && ['aria-allowed-attr', 'aria-allowed-role', 'aria-command-name', 'aria-dialog-name', 'aria-input-field-name', 'aria-meter-name', 'aria-required-children', 'aria-progressbar-name', 'aria-required-attr', 'aria-required-parent', 'aria-roles', 'aria-text', 'aria-toggle-field-name', 'aria-valid-attr', 'aria-tooltip-name', 'aria-treeitem-name', 'duplicate-id-aria', 'aria-valid-attr-value', 'aria-hidden-body', 'aria-hidden-focus'].includes(desktop_audit_id)) {
                $('.desktop_accessibility_aria_audits').append(html);
              }
                      
              else {
                console.log("accessibility kategoriye uymayan audit",desktop_audit_id);
              }

          }  else {

                console.log(desktop_audit_id);
          }
          
        }



        checkAndHideEmptyDivs();
      }
                  
      // Her bir audit için döngü
      // for (var key in audits) {
      //     if (audits.hasOwnProperty(key)) {
      //         var audit = audits[key]; // Tek bir audit verisi

      //         // HTML içeriğini oluştur
      //         var html = '<div class="accordion-item">' +
      //                       '<h2 class="accordion-header" id="flush-headingOne">' +
      //                           '<button class="accordion-button collapsed fs-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#' + key + '" aria-expanded="false" aria-controls="' + key + '">' +
      //                               '<div class="row">' +
      //                                   '<div class="row">' +
      //                                       '<h6>' + audit.description + '</h6>' +
      //                                   '</div>' +
      //                                   '<div class="row">' +
      //                                       '<div class="' + key + ' title"></div>' +
      //                                   '</div>' +
      //                               '</div>' +
      //                           '</button>' +
      //                       '</h2>' +
      //                       '<div id="' + key + '" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">' +
      //                           '<div class="accordion-body fw-normal">' +
      //                               '<table class="table border mb-0" id="' + key + '">' +
      //                                   '<thead>' +
      //                                       '<tr>';

      //         // headings içeriğini ekle
      //         for (var i = 0; i < audit.details.headings.length; i++) {
      //             html += '<th scope="col">' + audit.details.headings[i].label + '</th>';
      //         }

      //         html += '</tr>' +
      //                   '</thead>' +
      //                   '<tbody>';

      //         // items içeriğini ekle
      //         for (var j = 0; j < audit.details.items.length; j++) {
      //             html += '<tr>';
      //             for (var k = 0; k < audit.details.headings.length; k++) {
      //                 var keyItem = audit.details.headings[k].key;
      //                 html += '<td>' + audit.details.items[j][keyItem] + '</td>';
      //             }
      //             html += '</tr>';
      //         }

            //   html += '</tbody>' +
            //             '</table>' +
            //         '</div>' +
            //     '</div>' +
            // '</div>';

      //         // HTML içeriğini ekle
      //         $('#diagnostic_audits').append(html);
      //     }
      // }








      // Sonucu div'e ya
      

      // // Chart'a data ekle
      // chart_radial_gradient.series[0].data = data.sub_page_seo_score;
    },
    error: function () {
      console.log("AJAX isteğinde hata oluştu.");
      alert("Lütfen verdiğiniz linki kontrol ediniz!");
      $("#hidden-progress-div").addClass("d-none");
      $("#hidden-initial-div").removeClass("d-none");
    }
  });
});



  



































// $("#toogle").click(function (event) {
//   $(".ackapat").slideToggle(1000)
// });



// $("#sent_link").click(function (event) {
//   console.log("buton çalıştı");
  
//   $.ajax({
//     type: "GET",
//     url: "https://jsonplaceholder.typicode.com/posts/1",
//     success: function (data) {
//         console.log("AJAX isteği tamamlandı. Gelen veri: ", data);
//     },
//     error: function () {
//         console.log("AJAX isteğinde hata oluştu.");
//     }
// });
// });


// $("#sent_link").click(function (event) {
//   console.log("buton çalıştı");
  
//   $.ajax({
//     type: "GET",
//     url: "sub_link_analyze/",
//     dataType: 'json',
//     data: {
//       "den":"den",

//      },
//   success: function (data) {
//       console.log("AJAX isteği tamamlandı. Gelen veri: ", data);
//   },
//   error: function () {
//       console.log("AJAX isteğinde hata oluştu.");
//   }
// });
// });