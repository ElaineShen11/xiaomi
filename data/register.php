<?php
header("Content-type:text/json;charset=utf-8");

$username = $_POST['username'];
$password = $_POST['password'];
$request_type = $_POST['request_type'];

$temp = file_get_contents('./user.json');
$data = json_decode($temp);


if ($request_type == 'signin') {
    // $cart = array();
    $array = array("username" => $username, "password" => $password);
    Array_push($data, $array);

    $data = json_encode($data);
    $boolean = file_put_contents( './user.json', $data);
    if ($boolean != false) {
        echo '{"error": 0, "msg": "注册成功"}';
        return;
    } else {
        echo '{"error": 1, "msg": "写入失败"}';
        return;
    }
}

?>