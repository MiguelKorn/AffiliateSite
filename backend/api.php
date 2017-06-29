<?php
ob_start();
header('Content-Type: text/json');
require 'classes/DB.php';

$db = new DB();

$_GET['itemsPerPage'] ? $db->setLimit($_GET['itemsPerPage']) : null;
is_numeric($_GET['page']) ? $db->setOffset($_GET['page']) : null;

$data = $db->getItems();

echo json_encode($data);
