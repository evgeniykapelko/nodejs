/* eslint-disable no-undef */
$(function () {
    /** eslint-disable-next-line */
    var editor = new MediumEditor('#post-body', {
        placeholder: {
            text: '',
            hideOnClick: true
        }
    });

    // publish
    $('.publish-button').on('click', function (e) {
        e.preventDefault();
    
        var data = {
            title: $('#post-title').val(),
            body: $('#post-body').html()
        };
        console.log(data);

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/post/add'
        }).done(function(data) {
            console.log(data);
            if (!data.ok) {
                // $('.register h2').after('<p class="error">' + data.error + '</p>');
                // if (data.fields) {
                //     data.fields.forEach(item => {
                //         $('input[name' + item + ']').addClass('error');
                //     })
                // }
            } else {
                //$('.register h2').after('<p class="success">Отлично!</p>');
                //$(location).attr('href', '/');
            }
    
        })
    });
});
/* eslint-enable no-undef */
