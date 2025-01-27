
$(document).on('click', '.serp-ai', function (event) {
  // Butonun id'sini ve linkini al



  var prompt= $("#ai-chat").val();


  console.log("ai activated");
  console.log(prompt);


  // AJAX isteğini gönder
  $.ajax({
    type: "GET",
    url: "ai_chat/",
    dataType: 'json',
    data: {
      prompt: prompt
    },
    success: function (data) {
      console.log("success");

      

    },
    error: function () {
      console.log("AJAX isteğinde hata oluştu.");
      alert("Lütfen verdiğiniz linki kontrol ediniz!");
      $("#hidden-progress-div").addClass("d-none");
      $("#hidden-initial-div").removeClass("d-none");
    }
  });
});


