
$(function () {
    var $user = $('.user');
    var $pass = $('.pass');
    var $login = $('.login');
    $login.click(function () {
      if (!$user.val() || !$pass.val()) {
        alert('输入内容不能为空');
      } else {
        $.ajax({
          url: "./data/user.json",
          type: "get",
          dataType: "json",
          success: function (json) {
            var flag = true
            $.each(json, function (index, item) {
              if ($user.val() === item.username && $pass.val() === item.password) {
                flag = false
                localStorage.setItem('user', item.username);
                alert('登录成功');
                $(window).attr("location", "./index.html");
                return false
                /* if ($pass.val() === item.password) {
                   localStorage.setItem('user', item.username);
                   alert('登录成功');
                   $(window).attr("location", "./index.html");
                   return
                 }  */
              }
            });
            if(flag){
              alert('账号或密码错误')
            }
          },
        });
  
      }
    });
  });