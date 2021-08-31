<?php

    include_once("database.php");

    $postjson = json_decode(file_get_contents("php://input"),true);
    
    $today = date('Y-m-d H:i:s');

    //========================Register============================================
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
            $result = json_encode(array('success'=>false,'msg'=>$date_birthday ));
        }

        echo $result ;
    }

    //========================Login + Return The user Loged============================================
    elseif($postjson['aksi'] === 'proses_login'){
        $password = $postjson['password'];
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
            $result = json_encode(array('success'=>false,'msg'=>'Can\'t Login'));
        }

        echo $result ;
    }


    //=======================Return users by limit============================================
    elseif($postjson['aksi'] === 'loead_users'){

        $data = array();

        $start = $postjson['start'];
        $limit  = $postjson['limit'];
        
        $sql = "SELECT * FROM users ORDER BY id DESC LIMIT $start,$limit" ;
        
        $query = mysqli_query($mysqli,$sql);

        while($rows = mysqli_fetch_array($query)){

            $data[] = array(
                'id_user'          => $rows['id'],
                'your_name'        => $rows['name'],
                'gender'           => $rows['gender'],
                'date_birth'       => $rows['date_birthday'],
                'email_address'    => $rows['email'],
            );
        }
       

        if($query){
            $result = json_encode(array('success'=>true,'result'=>$data));
        }else {
            $result = json_encode(array('success'=>false,'msg'=>'Can\'t Login'));
        }

        echo $result ;
    }


    //=======================Delete user by id============================================
    elseif($postjson['aksi'] === 'del_users'){

        $id  = $postjson['id'];
       
        
        $sql = "DELETE FROM users WHERE id = '$id' " ;
        
        $query = mysqli_query($mysqli,$sql);
       
        if($query){
            $result = json_encode(array('success'=>true));
        }else {
            $result = json_encode(array('success'=>false));
        }

        echo $result ;
    }

    //========================Crud Register/Modify============================================
    elseif($postjson['aksi'] === 'proses_crud'){


        $password      = md5($postjson['password']);
        $id            = $postjson['id'];
        $name          = $postjson['your_name'];
        $email         = $postjson['email_address'];
        $date_birthday = $postjson['date_birth'];
        $gender        = $postjson['gender'];
        $action        = $postjson['action'] ;

        $sqlpass  = "SELECT password FROM users WHERE id='$id' ";
        $cekpass  = mysqli_fetch_array(mysqli_query($mysqli,$sqlpass));

        if($postjson['password']==""){
            $password = $cekpass['password'];
        }else{
            $password = md5($postjson['password']);
        }
    
        
        if($action =="create"){
            $sql = "INSERT INTO users(name,gender,date_birthday,email,password,created_at) 
                    VALUES ('$name','$gender','$date_birthday','$email','$password','$today') " ;
        }else{
            $sql = "UPDATE users SET 
                    name          = '$name',
                    gender        = '$gender',
                    date_birthday = '$date_birthday',
                    email         = '$email',
                    password      = '$password',
                    created_at    = '$today' WHERE id = '$id' " ;       
        }

        $query = mysqli_query($mysqli,$sql);

        if($query){
            $result = json_encode(array('success'=>true,'msg'=>'Seccessfuly'));
        }else {
            $result = json_encode(array('success'=>false,'msg'=>'Proses error'));
        }

        echo $result ;
    }

    //========================Login + Return users============================================
    elseif($postjson['aksi'] === 'proses_login'){
        $password = $postjson['password'];
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
            $result = json_encode(array('success'=>false,'msg'=>'Can\'t Login'));
        }

        echo $result ;
    }


    //========================LoadUser/Return single user by id============================================
    elseif($postjson['aksi'] === 'load_single_data'){
        
        $id = $postjson['id'];
        
        $sql = "SELECT * FROM users WHERE id='$id' " ;
        
        $query = mysqli_query($mysqli,$sql);

        while($rows = mysqli_fetch_array($query)){

            $data = array(
                'your_name'        => $rows['name'],
                'gender'           => $rows['gender'],
                'date_birth'       => $rows['date_birthday'],
                'email_address'    => $rows['email'],
            );
        }

        if($query){
            $result = json_encode(array('success'=>true,'result'=>$data));
        }else {
            $result = json_encode(array('success'=>false));
        }

        echo $result ;
    }


?>    