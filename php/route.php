<?php 
session_start();
include 'upload.php';

$function = $_GET['func'];

if (function_exists($function)) {
    
       $function();

}