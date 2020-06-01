
<?php
$fr=["Allan Kim","Sheila","Jules","Mark","Renol","Mike","De Lare","Nelson","Maggie"];
echo "<ul>";
for($i=0; $i < count($fr); $i++){
   
    echo "<li> {$i}. {$fr[$i]} </li>";
    echo "<ul>";
    for($j=0; $j < count($fr); $j++){
    
         echo "<li> {$j}. {$fr[$j]} </li>";
    }
    echo "</ul>";
    
}
echo "</ul>";
$table="<table>";
$table .="<tbody>";

for($i=0; $i<12; $i++){
  $table .="<tr>";
    for($j=0; $j<12; $j++){
        $ans=($i+1) * ($j +1);
 $table .= "<td> {$ans} </td>";
    }
    $table .="<tr>";
}

$table .="</tbody>";
$table .="</table>";
echo $table;