<?php

require 'classes/DB.php';
require 'classes/Parser.php';

$db = new DB();
$parser = new Parser();

$links = $db->getLinks();
$itemList = $parser->parseLinks($links);

foreach ($itemList as $item) {
    if(!$db->itemDateIsToday($item->id)) {
        if ($db->itemIdExists($item->id)) {
            // update
            if ($db->updateItem($item)) {
                echo $item->id . " updated <br>";
            }
        } else {
            // insert
            if ($db->insertItem($item)) {
                echo $item->id . " inserted! <br>";
            }
        }
    }
}