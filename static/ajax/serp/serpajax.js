
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
//------------------------MOBİLE SİDE-----------------------------------------------
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