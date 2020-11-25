<?php
/* 
接口说明文档

url: './data/user.php'
type: post
参数：user   用户账号
      pass  用户密码
      type  登录或注册
          = login 登录
          = add   注册 
返回值示例：
{"err":0,"msg":"登录成功"}

*/

$user = $_POST['user'];
$pass = $_POST['pass'];
$type = $_POST['type'];

// 连接数据库
$link = mysqli_connect('localhost','root','root','elaine');
if (!$link) {
  die('{"err":-1,"msg":"连接失败"}');
}

// 控制判断
if (!$user || !$pass || !$type) {
  die('{"err":-2,"msg":"参数错误"}');
} else {

  // 登录
  if ($type === 'login') {
    // 查询sql语句
    $login_sql = "select * from account where username='$user' and password='$pass'";
    // 执行sql语句
    $login_res = mysqli_query($link,$login_sql);
    $login_arr = mysqli_fetch_all($login_res,1);
    if (count($login_arr) > 0) {
      echo '{"err":0,"msg":"登录成功"}';
    } else {
      echo '{"err":-3,"msg":"账号或密码错误"}';
    }
  }
  // 注册
  if ($type === 'add') {
    // 先查询注册的账号是否已存在
    $query_sql = "select * from account where username='$user'";
    $query_res = mysqli_query($link,$query_sql);
    $query_arr = mysqli_fetch_all($query_res,1);
    if (count($query_arr) > 0) {
      echo '{"err":-4,"msg":"账号已被占用"}';
    } else {
      // 可以注册，插入数据
      $insert_sql = "insert into account(username,password) values('$user','$pass')";
      mysqli_query($link,$insert_sql);
      $num = mysqli_affected_rows($link);
      if ($num > 0){
        echo '{"err":1,"msg":"注册成功"}';
      } else {
        echo '{"err":-5,"msg":"注册失败"}';
      }
    }
  }

}
// 关闭连接
mysqli_close($link);
?>