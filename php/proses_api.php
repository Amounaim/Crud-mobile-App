<?php

    include_once("database.php");

    $postjson = json_decode(file_get_contents("php://input"),true);
    
    $today = date('Y-m-d H:i:s');

    if($postjson['aksi'] === 'proses_register'){
        $password = md5($postjson['password']);
        $name = $postjson['your_name'];
        $email  = $postjson['email_address'];
        $date_birthday = $postjson['date_birth'];
        $gender= $postjson['gender'];
        
        $sql = "INSERT INTO users(name,gender,date_birthday,email,password,created_at) 
        VALUES ('$name','$gender','$date_birthday','$email','$password','$today') " ;

        if($mysqli->query($sql) === TRUE){
            $result = json_encode(array('success'=>true,'msg'=>'Register Seccessfuly'));
        }else {
            $result = json_encode(array('success'=>false,'msg'=>'Can\'t Register' ));
        }

        echo $result ;
    }
    

    if($postjson['aksi'] === 'proses_login'){
        $password = md5($postjson['password']);
        $email  = $postjson['email_address'];
        
        $sql = "SELECT * FROM users WHERE email='$email' AND password='$password' " ;
        
        $logindata = mysqli_fetch_array(mysqli_query($mysqli,$sql));

        $data = array(
            'id_user'          => $logindata['id'],
            'your_name'        => $logindata['name'],
            'gender'           => $logindata['gender'],
            'date_birth'       => $logindata['date_birthday'],
            'email_address'    => $logindata['email'],
        );

        if($logindata){
            $result = json_encode(array('success'=>true,'result'=>$data));
        }else {
            $result = json_encode(array('success'=>false));
        }

        echo $result ;
    }


?>    