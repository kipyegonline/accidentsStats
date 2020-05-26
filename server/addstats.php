<?php
require_once("./db.php");

if(isset($_GET["addStats"]) && $_GET["addStats"]=="true" ){
   
    $vClass=$_POST["classv"];
    $year=$_POST["year"];
    $seriousInjuries=$_POST["seriousInjuries"];
    $slightInjuries=$_POST["slightInjuries"];
    $fatalties=$_POST["fatalities"];
    $date=$_POST["date"];
   
//if everything is present
    if($vclass > 0 && strlen($year)>0 && strlen( $seriousInjuries) && strlen($slightInjuries)&& strlen( $fatalties)&& strlen($date)){
$year==2020 ? insertStats("victimsCases", $vClass,$fatalties,$seriousInjuries,$slightInjuries,$date) :
insertStats("victimsCases2019", $vClass,$fatalties,$seriousInjuries,$slightInjuries,$date) 
;
    }else{
        $res=[];
        $res["nothing"]="Nothing there";
         echo json_encode($res);
    }
} //GET'

if(isset($_GET["fetchStats"]) && $_GET["fetchStats"]=="true" ){
   $table=$_GET["tableName"];
   fetchStats($table);
 
}else{
    $res=[];
    $res["Nothing"]="Nothing is coming in";
    echo json_encode($res);
}
function insertStats($table,$vClass,$fatalties,$seriousInjuries,$slightInjuries,$date){
    global $connection;

    $sql="insert into `{$table}` (
`class_id`,
`fatal`,
`seriouslyInjured` ,
`slightlyInjured` ,
`addedOn` )
VALUES(
:class_id,
:fatal,
:seriouslyInjured ,
:slightlyInjured,
:addedOn)";
try{
    $stmt=$connection->prepare($sql);
if($stmt){
$stmt-> execute(Array(
":class_id"=> $vClass,
":fatal"=>$fatalties,
":seriouslyInjured"=>$seriousInjuries ,
":slightlyInjured"=>$slightInjuries,
":addedOn"=>$date));
$id =$connection->lastInserId();
$res=[];

if($id >0 ){
$res["status"]=200;
}else{
$res["status"]=201;
}
  
echo $res;
}

}
catch(PDOException $e){
    echo "Error inserting info " . $e.getMessage();
}



}//insert func


function fetchStats($table){
     global $connection;
     $sql="select b.id as id,
a.name as victimClass,
a.colors as fill,
 b.fatal as fatalties,
 b.slightlyInjured as slightlyInjured,
 b.seriouslyInjured as seriouslyInjured,
 b.addedon 
from classVictims a 
inner join {$table} b on  a.id=b.class_id  
 ORDER BY  addedon, fatalties desc";
    try{
        $stmt=$connection->exec($sql);
 if($stmt){
     $res=$stmt->fetchAll(PDO::FETCH_ASSOC);
     echo json_encode($res);
 }
    }
    catch(PDOException $e){
        echo "Error fetching info " . $e.getMessage();
    }

}

?>