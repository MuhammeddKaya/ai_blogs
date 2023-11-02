
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
      
      // Her bir grafik için işlevi kullanarak güncelleme yapın
      updateChart(mobile_performance_score_chart, data.mobile_performance_score);
      updateChart(mobile_accessibility_score_chart, data.mobile_accessibility_score);
      updateChart(mobile_seo_score_chart, data.mobile_seo_score);
      updateChart(mobile_best_practices_score_chart, data.mobile_best_practices_score);
      updateChart(desktop_performance_score_chart, data.desktop_performance_score);
      updateChart(desktop_accessibility_score_chart, data.desktop_accessibility_score);
      updateChart(desktop_seo_score_chart, data.desktop_seo_score);
      updateChart(desktop_best_practices_score_chart, data.desktop_best_practices_score);
    



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