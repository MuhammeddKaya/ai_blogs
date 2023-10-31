
$(document).on('click', '.view-link', function (event) {
    // Butonun id'sini ve linkini al

    
    var link = $(this).data('link');

    console.log(link);
    // AJAX isteğini gönder
    $.ajax({
      type: "GET",
      url: "sub_link_analyze/",
      dataType: 'json',
      data: {
        link: link
      },
      success: function (data) {
        console.log("success")
        var seoScore = data.sub_page_seo_score;

        // Gizli div içeriğini taşı ve görünür yap
        $('#seo-score').text(seoScore);
        $('#hidden-result-div').removeClass('d-none');

        // Sonuç içeren div'i bul
        var resultDiv = $('[data-id="' + link + '"]');
        var chartDiv = $('[id="chart-div"]');
        
        console.log(resultDiv)
        console.log(data)
        // Sonucu div'e yaz
        resultDiv.empty();
        // resultDiv.html(' <div class="card-body p-4"><h1>Bu sayfa için Seo Skoru: ' + seoScore+'</h1></div>');
        resultDiv.html($('#hidden-result-div').html());
        resultDiv.removeClass('d-none');
        $('#hidden-result-div').addClass('d-none');


        var chart_radial_gradient = new ApexCharts(
          chartDiv,
          options_gradient
        );
        chart_radial_gradient.render();
        
        // Chart'a data ekle
        chart_radial_gradient.series[0].data = data.sub_page_seo_score;
      },
      error: function () {
        console.log("AJAX isteğinde hata oluştu.");
      }
    });
  });


  var options_gradient = {
    series: [75],
    chart: {
      fontFamily: '"Nunito Sans", sans-serif',
      height: 100, // Chart'ın yüksekliği 100 piksel olarak ayarlandı.
      width: 100, // Chart'ın genişliği 100 piksel olarak ayarlandı.
      type: "radialBar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: "#fff",
          strokeWidth: "67%",
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
        },
  
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: "#615dff",
            fontSize: "17px",
          },
          value: {
            formatter: function (val) {
              return parseInt(val);
            },
            color: "#6610f2",
            fontSize: "36px",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#615dff"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Percent"],
  };
  



































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