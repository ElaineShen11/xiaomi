var login = document.querySelector('.login')
var uesr = document.querySelector('.user')
var pass = document.querySelector('pass')

login.onclick = function(){
    var passVal = pass.value
    var userVal = user.value
    ajax({
        url:'./user.php',
        type:'post',
        data:{
            user:userVal,
            pass:passVal,
            type:'login'
        },
        dataType:'json',
        success:function(json){
            alert(json.msg)
        },
        error:function(code){
           alert(code)
        }
    })
}