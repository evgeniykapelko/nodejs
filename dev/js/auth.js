/* eslint-disable no-undef */
$(function () {
    // toggle
    var flag = true;
    $('.switch-button').on('click', function(e) {
        e.preventDefault();

        $('input').val('');
        $('p.error').remove();
        $('input').removeClass('error');


        if (flag) {
            flag = false;
            $('.register').show('slow');
            $('.login').hide();
        } else {
            flag = true;
            $('.login').show('slow');
            $('.register').hide();
        }
    });

// clear
$('form.login input, form.register input').on('focus', () => {
    $('p.error').remove();
    $('input').removeClass('error');
});

// register
$('.register-button').on('click', function (e) {
    e.preventDefault();
    $('p.error').remove();
    $('input').removeClass('error');

    var data = {
        login: $('#register-login').val(),
        password: $('#register-password').val(),
        passwordConfirm: $('#register-password-confirm').val()
    }

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/api/auth/register'
    }).done(function(data) {
        if (!data.ok) {
            $('.register h2').after('<p class="error">' + data.error + '</p>');
            if (data.fields) {
                data.fields.forEach(item => {
                    $('input[name' + item + ']').addClass('error');
                })
            }
        } else {
            //$('.register h2').after('<p class="success">Отлично!</p>');
            $(location).attr('href', '/');
        }

    })
});
    // login
    $('.login-button').on('click', function (e) {
        e.preventDefault();
        $('p.error').remove();
        $('input').removeClass('error');

    var data = {
        login: $('#login-login').val(),
        password: $('#login-password').val(),
    }

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/api/auth/login'
    }).done(function(data) {
        if (!data.ok) {
            $('.login h2').after('<p class="error">' + data.error + '</p>');
            if (data.fields) {
                data.fields.forEach(item => {
                    $('input[name' + item + ']').addClass('error');
                })
            }
        } else {
            //$('.login h2').after('<p class="success">Отлично!</p>');
            $(location).attr('href', '/');
        }

    })
    });
});
/* eslint-enable no-undef */
