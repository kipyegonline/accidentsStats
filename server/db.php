<?php
try{
$connection=new PDO("mysql:host=localhost; dbname=NTSA","root","//matata11");
}
catch(PDOException  $e){
    echo "Error connecting to the server ". $e->getMessage();
}
?>