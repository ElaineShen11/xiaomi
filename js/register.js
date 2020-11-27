$(function () {
    $('.register-btn').click(function () {
        if ((!$('.user').val() || !$('.pass').val())) {
            alert('输入的内容不能为空')
        } else {
            $.ajax({
                url: "./data/register.php",
                type: "post",
                dataType: "text",
                data: {
                    username: $('.user').val(),
                    password: $('.pass').val(),
                    request_type: 'signin'
                },
                success: function (data) {
                    var obj = JSON.parse(data)
                    alert(obj.msg)
                    $(window).attr('location','./login.html')
                }
            })
        }
    })
})
