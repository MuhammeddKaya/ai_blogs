//template/project/blog/blog_generator.html
$(document).ready(function() {

    $("#generate-titles-form").submit(function (e) {
        // preventing from page reload and default actions
        e.preventDefault();
        url= $(this).attr('url-ai-blog-title-generate'),
         // make POST ajax call
        $.ajax({
            url: url,
            method:'POST',
            data: {
                blog_context_value: $('#blog_context').val(),
	            blog_keywords_value: $('#blog_keywords').val(),
                target_audience_value: $('#target_audience').val(),
                csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
            },
            success: function(response) {
                get_ai_blog_titles(response.titles)
                alert('Data Successfully Posted');
            },
            error: function(error) {
                console.log(error);
            },
        });
    });

    function get_ai_blog_titles(titles){
        data = {
            title: JSON.stringify(titles)
          }
        url= $("#ai-generated-title-list").attr('url-get-ai-blog-titles'),
        
        $.ajax({
            url: url,
            data : data,
            success: function(response){
                $("#ai-generated-title-list").html(response);
            },
            error: function(error){
                console.log("something went wrong");
            }
        });
    }

});

