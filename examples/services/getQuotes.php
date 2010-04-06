<?php
$xmlfile = "quotes.xml";
$match = $_GET['match'];
if (file_exists( $xmlfile )) {
  try {
    $quotes = simplexml_load_file( $xmlfile );
    foreach ($quotes->quote as $quote) {
      if(
        ( $match != "" && preg_match("/" . $match . "/i", $quote)) || $match == ""
      ) echo $quote, '<br/><br/>';
    }
  } 
  catch (Exception $e) { /* error "*/ }
}
?>