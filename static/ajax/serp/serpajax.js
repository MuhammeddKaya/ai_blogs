
$(document).on('click', '.serp-analyze-link', function (event) {
  // Butonun id'sini ve linkini al



  var link = $("#input-search").val();
  var checkresultdiv = $("#hidden-result-div").attr("class");
  if (!checkresultdiv) {
    $('#hidden-result-div').addClass('d-none');
  }

  console.log("serp analyze çalıştı");
  console.log(link);


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
    
        // console.log(score);
    
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

   
      
    var mobile_seo_audit_list_data=data.mobile_seo_audit_list;
    var mobile_seo_audit_list=[];

    for (let audit of mobile_seo_audit_list_data) {
      if (audit.group !== "hidden") {
          mobile_seo_audit_list.push(audit.id);
      }
    }

    console.log('mobile_seo_audit_list',mobile_seo_audit_list); 


    var mobile_best_practices_audit_list_data=data.mobile_best_practices_audit_list;
    var mobile_best_practices_audit_list=[];

    for (let audit of mobile_best_practices_audit_list_data) {
      if (audit.group !== "hidden") {
          mobile_best_practices_audit_list.push(audit.id);
      }
    }

    console.log('mobile_best_practices_audit_list',mobile_best_practices_audit_list); 
    

    var mobile_performance_audit_list_data=data.mobile_performance_audit_list;
    var mobile_performance_audit_list=[];

    for (let audit of mobile_performance_audit_list_data) {
      if (audit.group !== "hidden") {
          mobile_performance_audit_list.push(audit.id);
      }
    }

    console.log('mobile_performance_audit_list',mobile_performance_audit_list); 


    var mobile_accessibility_audit_list_data=data.mobile_accessibility_audit_list;
    var mobile_accessibility_audit_list=[];

    for (let audit of mobile_accessibility_audit_list_data) {
      if (audit.group !== "hidden") {
          mobile_accessibility_audit_list.push(audit.id);
      }
    }

    console.log('mobile_accessibility_audit_list',mobile_accessibility_audit_list); 


    var desktop_seo_audit_list_data=data.desktop_seo_audit_list;
    var desktop_seo_audit_list=[];

    for (let audit of desktop_seo_audit_list_data) {
      if (audit.group !== "hidden") {
          desktop_seo_audit_list.push(audit.id);
      }
    }

    console.log('desktop_seo_audit_list',desktop_seo_audit_list); 


    var desktop_best_practices_audit_list_data=data.desktop_best_practices_audit_list;
    var desktop_best_practices_audit_list=[];

    for (let audit of desktop_best_practices_audit_list_data) {
      if (audit.group !== "hidden") {
          desktop_best_practices_audit_list.push(audit.id);
      }
    }

    console.log('desktop_best_practices_audit_list',desktop_best_practices_audit_list); 
    

    var desktop_performance_audit_list_data=data.desktop_performance_audit_list;
    var desktop_performance_audit_list=[];

    for (let audit of desktop_performance_audit_list_data) {
      if (audit.group !== "hidden") {
          desktop_performance_audit_list.push(audit.id);
      }
    }

    console.log('desktop_performance_audit_list',desktop_performance_audit_list); 


    var desktop_accessibility_audit_list_data=data.desktop_accessibility_audit_list;
    var desktop_accessibility_audit_list=[];

    for (let audit of desktop_accessibility_audit_list_data) {
      if (audit.group !== "hidden") {
          desktop_accessibility_audit_list.push(audit.id);
      }
    }

    console.log('desktop_accessibility_audit_list',desktop_accessibility_audit_list); 



    function escapeHtml(unsafe) {
      return unsafe
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
    }
    


    function createTableHTML(mobile_html_audit) {
      if (mobile_html_audit == '') {
          return '';
      } else {
          let tableHTML = '';
  
          // Check the type of table and handle accordingly
          if (mobile_html_audit.type === 'table' || mobile_html_audit.type === 'opportunity') {
              // Single table case
              tableHTML = buildSingleTable(mobile_html_audit.headings, mobile_html_audit.items);
  
          } else if (mobile_html_audit.type === 'list') {
              // Multiple tables case
              mobile_html_audit.items.forEach(function (item) {
                  if (item.type === 'table') {
                      tableHTML += buildSingleTable(item.headings, item.items);
                  } else if (Array.isArray(item.items)) {
                      tableHTML += buildSingleTable(mobile_html_audit.headings, item.items);
                  }
              });
  
          } else if (mobile_html_audit.type === 'criticalrequestchain') {
              // Chains structure
              tableHTML = buildChainsTable(mobile_html_audit);
  
          } else {
              return ''; // Unsupported type
          }
  
          return tableHTML;
      }
    }
    
    function buildSingleTable(headings, items) {
        let tableHTML = '<table class="table border mb-0">' +
            '<thead>' +
            '<tr>';
    
        // Add headings to the table
        headings.forEach(function (heading) {
            if (heading.label) {
                tableHTML += '<th scope="col">' + heading.label + '</th>';
            } else {
                tableHTML += '<th scope="col"></th>';
            }
        });
        tableHTML += '</tr>' +
            '</thead>' +
            '<tbody>';
    
        // Add items to the table
        items.forEach(function (item) {
            tableHTML += '<tr>';
            headings.forEach(function (heading) {
                let value;
    
                // Check if the heading key corresponds to a node
                if (heading.valueType === 'node' && item.node) {
                    value = item.node.nodeLabel;  // Use nodeLabel if it exists
                    if (item.node.snippet) {
                        value += '<br><small style="color: #3b61ce;">' +  escapeHtml(item.node.snippet) + '</small>';  // Add snippet below nodeLabel
                    }
                } else {
                    value = item[heading.key];
                }
    
                if (value === undefined) {
                    value = '-';
                } else if (typeof value === 'number') {
                    value = value.toLocaleString();
                }
    
                tableHTML += '<td>' + value + '</td>';
            });
            tableHTML += '</tr>';
        });
    
        tableHTML += '</tbody></table>';
        return tableHTML;
    }
    
    function buildChainsTable(mobile_html_audit) {
        let chains = mobile_html_audit.items;
        let tableHTML = '<table class="table border mb-0">' +
            '<thead>' +
            '<tr>' +
            '<th scope="col">Request URL</th>' +
            '<th scope="col">Start Time</th>' +
            '<th scope="col">Duration</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
    
        // Recursive function to iterate over chains
        function renderChain(chain) {
            for (let request in chain) {
                tableHTML += '<tr>' +
                    '<td>' + chain[request].url + '</td>' +
                    '<td>' + chain[request].startTime + '</td>' +
                    '<td>' + chain[request].endTime + '</td>' +
                    '</tr>';
                if (chain[request].children) {
                    renderChain(chain[request].children);
                }
            }
        }
    
        renderChain(chains);
        tableHTML += '</tbody></table>';
        return tableHTML;
    }
  
  
  
  
 
  
      

      function updateData() {
        clearContents();

        for (var key in mobile_audits) {

          var mobile_audit_id = mobile_audits[key].id;
          var mobile_audit_score = mobile_audits[key].score;
          var mobile_audit_score_display_mode = mobile_audits[key].scoreDisplayMode;
          var mobile_display_value = mobile_audits[key].displayValue;
          var audit_tr_title = audits_tr[mobile_audit_id];
          

          if ((mobile_audits[key].details)) {
            var mobile_html_audit = mobile_audits[key].details;

          }else{
            var mobile_html_audit='';
          }
        


          // console.log(mobile_audit_id,mobile_html_audit);
          // if ((mobile_audits[key].details)&&(mobile_audits[key].details.items)&&(mobile_audits[key].details.headings)) {
          //   var mobile_html_audit = mobile_audits[key].details;

          // }else{
          //   var mobile_html_audit='';
          // }


          if (typeof mobile_display_value === 'undefined') {
            mobile_display_value = ''; // Veya 'N/A', 'Not Available', vs. gibi bir placeholder metin kullanabilirsiniz.
          }

          var mobile_display_value_class;
          var ikon;
          if (mobile_audit_score == 1) {
              ikon = '<i class="ti ti-circle me-2 fs-4 text-success"></i>';
              mobile_display_value_class = 'text-success';
          } else if (mobile_audit_score >= 0.5) {
              ikon = '<i class="ti ti-triangle me-2 fs-4 text-warning"></i>';
              mobile_display_value_class = 'text-warning';
          } else {
              ikon = '<i class="ti ti-alert-octagon me-2 fs-4 text-danger"></i>';
              mobile_display_value_class = 'text-danger';
          }


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
          

          var mobile_audit_table = createTableHTML(mobile_html_audit);

          // HTML içeriğini oluştur
          var html =                 '<div class="accordion accordion-flush mb-2 card position-relative overflow-hidden" id="accordionFlushExample">'+
                    '<div class="accordion-item">'+
                      '<h2 class="accordion-header" id="flush-headingOne">'+
                        '<button class="accordion-button collapsed fs-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#'+'mobile'+mobile_audit_id+'" aria-expanded="false" aria-controls="'+'mobile'+mobile_audit_id+'">'+
                          '<div class="row">'+
                          ' <div class="row">'+
                              '<h6>'+ikon + mobile_audit_title+'&nbsp; &nbsp; <span class="' + mobile_display_value_class + '">' + mobile_display_value + '</span></h6>' +
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
                        '<div class="card-body"> '+
                          mobile_audit_table+
                        '</div>'+
                      '</div>'+
                    '</div>'+

                  '</div>';


          
            
          // Audit'in listemizde olup olmadığını kontrol et
          if (mobile_best_practices_audit_list.includes(mobile_audit_id)) {

              if (mobile_audit_score==1){
                $('.mobile_best_practices_passed_audits').append(html);
              }
              else if (mobile_audit_score==null){
                $('.mobile_best_practices_not_applicable_audits').append(html);
              }
              else if (!(mobile_audit_score == 1) && ['csp-xss'].includes(mobile_audit_id)) {
                $('.mobile_best_practices_trust_and_safety_audits').append(html);
              }
              else if (!(mobile_audit_score == 1) && ['inspector-issues','js-libraries','valid-source-maps','third-party-cookies'].includes(mobile_audit_id)) {
                $('.mobile_best_practices_general_audits').append(html);
              }
              else if (!(mobile_audit_score == 1) && ['image-aspect-ratio'].includes(mobile_audit_id)) {
                $('.mobile_best_practices_user_experience_audits').append(html);
              }
              else {
                console.log("best practices kategoriye uymayan audit",mobile_audit_id);
              } 

          } else if (mobile_seo_audit_list.includes(mobile_audit_id)) {
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

          } else if (mobile_performance_audit_list.includes(mobile_audit_id)) {
              if (mobile_audit_score==1){
                $('.mobile_performance_passed_audits').append(html);
              }
              else {
                $('.mobile_performance_diagnostic_audits').append(html);
              }

          } else if (mobile_accessibility_audit_list.includes(mobile_audit_id)) {

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
          var desktop_display_value = desktop_audits[key].displayValue;
          var audit_tr_title = audits_tr[desktop_audit_id];

          if (typeof desktop_display_value === 'undefined') {
            desktop_display_value = ''; // Veya 'N/A', 'Not Available', vs. gibi bir placeholder metin kullanabilirsiniz.
          }



          if ((desktop_audits[key].details)) {
            var desktop_html_audit = desktop_audits[key].details;

          }else{
            var desktop_html_audit='';
          }


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
          

          
          var desktop_display_value_class;
          var ikon;
          if (desktop_audit_score == 1) {
              ikon = '<i class="ti ti-circle me-2 fs-4 text-success"></i>';
              desktop_display_value_class = 'text-success';
          } else if (desktop_audit_score >= 0.5) {
              ikon = '<i class="ti ti-triangle me-2 fs-4 text-warning"></i>';
              desktop_display_value_class = 'text-warning';
          } else {
              ikon = '<i class="ti ti-alert-octagon me-2 fs-4 text-danger"></i>';
              desktop_display_value_class = 'text-danger';
          }


          var desktop_audit_table = createTableHTML(desktop_html_audit);
          // HTML içeriğini oluştur
          var html =                 '<div class="accordion accordion-flush mb-2 card position-relative overflow-hidden" id="accordionFlushExample">'+
                    '<div class="accordion-item">'+
                      '<h2 class="accordion-header" id="flush-headingOne">'+
                        '<button class="accordion-button collapsed fs-4 fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#'+'desktop'+desktop_audit_id+'" aria-expanded="false" aria-controls="'+'desktop'+desktop_audit_id+'">'+
                          '<div class="row">'+
                          ' <div class="row">'+
                              '<h6>'+ ikon + desktop_audit_title+'&nbsp; &nbsp; <span class="' + desktop_display_value_class + '">' + desktop_display_value + '</span></h6>' +
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
                        '<div class="card-body">'+
                          desktop_audit_table+
                        '</div>'+
                      '</div>'+
                    '</div>'+

                  '</div>';




          

          // Audit'in listemizde olup olmadığını kontrol et
          if (desktop_best_practices_audit_list.includes(desktop_audit_id)) {

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

          } else if (desktop_seo_audit_list.includes(desktop_audit_id)) {
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

          } else if (desktop_performance_audit_list.includes(desktop_audit_id)) {
              if (desktop_audit_score==1){
                $('.desktop_performance_passed_audits').append(html);
              }
              else {
                $('.desktop_performance_diagnostic_audits').append(html);
              }

          } else if (desktop_accessibility_audit_list.includes(desktop_audit_id)) {

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
                  

    },
    error: function () {
      console.log("AJAX isteğinde hata oluştu.");
      alert("Lütfen verdiğiniz linki kontrol ediniz!");
      $("#hidden-progress-div").addClass("d-none");
      $("#hidden-initial-div").removeClass("d-none");
    }
  });
});


