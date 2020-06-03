<?php
require_once("./db.php");

if(isset($_GET["addStats"]) && $_GET["addStats"]=="true" ){
   
    $vClass=$_POST["classv"];
    $year=$_POST["year"];
    $seriousInjuries=$_POST["seriousInjuries"];
    $slightInjuries=$_POST["slightInjuries"];
    $fatalities=$_POST["fatalities"];
    $date=$_POST["date"];

    $table=$year==2020 ? "victimsCases" :"victimsCases2019";
    //check duplication cases
  $res=[];
$query="SELECT COUNT(*) FROM $table WHERE addedOn='{$date}' and fatal={$fatalities}";

    if(checkDuplicate($query)){
         $res["msg"]="It seems you're trying to add duplicate information.Please check dates and try again";
        $res["status"]=201;
         echo json_encode($res);
    }else{
        //if no duplicates
        //and everything is present, atleast
    if($vClass > 0 && strlen($year)>0 && strlen( $seriousInjuries)>0 && strlen($slightInjuries) >0 && strlen( $fatalities) >0 && strlen($date)>0){
 insertStats($table, $vClass,$fatalities,$seriousInjuries,$slightInjuries,$date, $year);
    }else{
      
        $res["msg"]="Some details are missing.Check and try again";
        $res["status"]=201;
         echo json_encode($res);
    }

    }

} //GET'

if(isset($_GET["fetchStats"]) && $_GET["fetchStats"]=="true" ){
 $table=$_GET["tableName"];
 $res=[];

     if(!empty($table)){
 fetchStats($table);
     }else{
$res["status"]=201;
$res["msg"]="Cannot find the damn table";
echo json_encode($res);
     }
  
 
}//GET
function insertStats($table,$vClass,$fatalties,$seriousInjuries,$slightInjuries,$date,$year){
    global $connection;
    //check if the are duplicate

    

    $sql="insert into {$table} (
class_id,
fatal,
seriouslyInjured,
slightlyInjured,
addedOn)
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
$id= $connection->lastInsertId();
$res=[];
if($id >0 ){
$res["status"]=200;
$res["msg"]="Statistics  added successfully";

}else{
$res["status"]=201;
$res["msg"]="Error adding stats,check your network connection and try again.";

}
echo json_encode($res);
}//stm if
}
catch(PDOException $e){
 echo "Error inserting info " . $e.getMessage();
}


 


}//insert func


function fetchStats($table){
     global $connection;
   
     $sql="select b.id as id,a.name as victimClass,a.colors as fill, b.fatal as fatalties, b.slightlyInjured as slightlyInjured, b.seriouslyInjured as seriouslyInjured, b.addedon as addedon from classVictims a inner join {$table} b on  a.id=b.class_id  ORDER BY  addedon, fatalties desc";

    try{
        $stmt=$connection->query($sql);
 if($stmt){
     $res=$stmt->fetchAll(PDO::FETCH_ASSOC);
     
     echo json_encode($res);
 }else{
     echo "error fetching on table " . $table;
 }
    }
    catch(PDOException $e){
        echo "Error fetching info " . $e.getMessage();
    }

}
function checkDuplicate($sql){
    global $connection;
    $stmt=$connection->query($sql);
if($stmt){
    $rowCount=$stmt-> fetchColumn();
 if($rowCount >0){
return true;
    }else{
return false;
    }
}else{
   return false;
}

   
     
    
}

?>