$(function () {
    // custom chart
    var options_custom = {
        series: [67],
        chart: {
          fontFamily: '"Nunito Sans", sans-serif',
          height: 200,
          type: "radialBar",
          offsetY: -10,
        },
        colors: ["#615dff"],
        plotOptions: {
          radialBar: {
            startAngle: 0,
            endAngle: -360,
            dataLabels: {
              name: {
                fontSize: "16px",
                color: undefined,
                offsetY: 0,
              },
              value: {
                offsetY: 0,
                fontSize: "22px",
                color: "##1f1f1f",
                formatter: function(value) {
                  return value.toFixed(0);
                },
              },
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 65, 91],
          },
        },
        stroke: {
          dashArray: 4,
        },
        labels: [""],
      };
    
    var options_custom_big = {
      series: [67],
      chart: {
        fontFamily: '"Nunito Sans", sans-serif',
        height: 330,
        type: "radialBar",
        offsetY: -10,
      },
      colors: ["#615dff"],
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: -360,
          dataLabels: {
            name: {
              fontSize: "16px",
              color: undefined,
              offsetY: 0,
            },
            value: {
              offsetY: 0,
              fontSize: "22px",
              color: "##1f1f1f",
              formatter: function(value) {
                return value.toFixed(0);
              },
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91],
        },
      },
      stroke: {
        dashArray: 4,
      },
      labels: [""],
    };
      
  
  // ---------------------------------------------------------------------------------------
  // ----------------------------------- Charts -------------------------------------------
  // ---------------------------------------------------------------------------------------
  
  //--------------mobile side-------------
    mobile_performance_score_chart = new ApexCharts(
      document.querySelector("#mobile_performance_score-div"),
      options_custom
    );
    mobile_performance_score_chart.render();
  
    mobile_accessibility_score_chart = new ApexCharts(
      document.querySelector("#mobile_accessibility_score-div"),
      options_custom
    );
    mobile_accessibility_score_chart.render();
  
    mobile_seo_score_chart = new ApexCharts(
      document.querySelector("#mobile_seo_score-div"),
      options_custom
    );
    mobile_seo_score_chart.render();
  
    mobile_best_practices_score_chart = new ApexCharts(
      document.querySelector("#mobile_best_practices_score-div"),
      options_custom
    );
    mobile_best_practices_score_chart.render();


    //--------------desktop side-------------
    desktop_performance_score_chart = new ApexCharts(
      document.querySelector("#desktop_performance_score-div"),
      options_custom
    );
    desktop_performance_score_chart.render();
  
    desktop_accessibility_score_chart = new ApexCharts(
      document.querySelector("#desktop_accessibility_score-div"),
      options_custom
    );
    desktop_accessibility_score_chart.render();
  
    desktop_seo_score_chart = new ApexCharts(
      document.querySelector("#desktop_seo_score-div"),
      options_custom
    );
    desktop_seo_score_chart.render();
  
    desktop_best_practices_score_chart = new ApexCharts(
      document.querySelector("#desktop_best_practices_score-div"),
      options_custom
    );
    desktop_best_practices_score_chart.render();
  
  // ---------------------------------------------------------------------------------------
  // --------------------------- Big Size Charts -------------------------------------------
  // ---------------------------------------------------------------------------------------


    //--------------mobile side-------------
    mobile_performance_score_big_chart = new ApexCharts(
      document.querySelector("#mobile_performance_score_big-div"),
      options_custom_big
    );
    mobile_performance_score_big_chart.render();

    mobile_accessibility_score_big_chart = new ApexCharts(
      document.querySelector("#mobile_accessibility_score_big-div"),
      options_custom_big
    );
    mobile_accessibility_score_big_chart.render();

    mobile_seo_score_big_chart = new ApexCharts(
      document.querySelector("#mobile_seo_score_big-div"),
      options_custom_big
    );
    mobile_seo_score_big_chart.render();

    mobile_best_practices_score_big_chart = new ApexCharts(
      document.querySelector("#mobile_best_practices_score_big-div"),
      options_custom_big
    );
    mobile_best_practices_score_big_chart.render();  

    //--------------desktop side-------------
    desktop_performance_score_big_chart = new ApexCharts(
      document.querySelector("#desktop_performance_score_big-div"),
      options_custom_big
    );
    desktop_performance_score_big_chart.render();

    desktop_accessibility_score_big_chart = new ApexCharts(
      document.querySelector("#desktop_accessibility_score_big-div"),
      options_custom_big
    );
    desktop_accessibility_score_big_chart.render();
  
    desktop_seo_score_big_chart = new ApexCharts(
      document.querySelector("#desktop_seo_score_big-div"),
      options_custom_big
    );
    desktop_seo_score_big_chart.render();
  
    desktop_best_practices_score_big_chart = new ApexCharts(
      document.querySelector("#desktop_best_practices_score_big-div"),
      options_custom_big
    );
    desktop_best_practices_score_big_chart.render();
  
  
  
  
  
  });
  
  
  console.log("custom_chart_js")