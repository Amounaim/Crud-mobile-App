<?php 

    # Set the headers for the restful api"
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header("Content-Type: application/json; charset=UTF-8");
    header('Access-Control-Allow-Origin', 'http://localhost:8100');


    $db_host = 'localhost';
    $db_username = 'root';
    $db_password = 'saramounaim';
    $db_name = 'ionic5_register';
    $mysqli = new mysqli($db_host, $db_username, $db_password,$db_name);

    date_default_timezone_set('Asia/Jakarta');

?>