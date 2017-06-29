<?php

class DB
{
    private $db;
    private $action;
    private $order;
    private $orderBy;
    private $limit;
    private $offset;

    function __construct()
    {
        try {
            $this->db = new PDO('mysql:host=127.0.0.1;dbname=miguelkorn_School', 'miguelkorn_root', 'password');
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
        $this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    }

    public function setLimit($limit)
    {
        $this->limit = $limit;
    }

    public function setOffset($offset)
    {
        $this->offset = $offset * $this->limit;
    }

    public function getLinks()
    {
        $stmt = $this->db->prepare("SELECT * FROM iProject_Links");
        $stmt->execute();

        $result = $stmt->fetchAll();
        return $result;
    }

    public function itemIdExists($id)
    {
        $stmt = $this->db->prepare("SELECT item_id FROM iProject_Items WHERE item_id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        return $stmt->rowCount();
    }

    public function itemDateIsToday($id)
    {
        $stmt = $this->db->prepare("SELECT `date` FROM iProject_Items WHERE item_id = :id AND DATE(`date`) = CURDATE() LIMIT 1");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->rowCount();
    }

    //  DATE(NOW()) = DATE(duedate)
    //  OR
    //  DATE(duedate) = CURDATE()
    //  current time sql => now();
    public function updateItem($item)
    {
        $stmt = $this->db->prepare("UPDATE `iProject_Items` SET `type_id`= :type,`url`= :url,`name`= :name,`img`= :img,`price`= :price,`old_price`= :old_price,`discount`= :disc, `flash_sale`= :fs, `date` = NOW() WHERE `item_id` = :id");
        $stmt->bindParam(":type", $item->type);
        $stmt->bindParam(":url", $item->url);
        $stmt->bindParam(":name", $item->name);
        $stmt->bindParam(":img", $item->img);
        $stmt->bindParam(":price", $item->price);
        $stmt->bindParam(":old_price", $item->old_price);
        $stmt->bindParam(":disc", $item->discount);
        $stmt->bindParam(":fs", $item->flash_sale);
        $stmt->bindParam(":id", $item->id);

        return $stmt->execute();
    }

    public function insertItem($item)
    {
        $stmt = $this->db->prepare("INSERT INTO `iProject_Items`(`type_id`, `item_id`, `url`, `name`, `img`, `price`, `old_price`, `discount`, `flash_sale`) VALUES (:type, :id, :url, :name, :img, :price, :old_price, :disc, :fs)");
        $stmt->bindParam(":type", $item->type);
        $stmt->bindParam(":id", $item->id);
        $stmt->bindParam(":url", $item->url);
        $stmt->bindParam(":name", $item->name);
        $stmt->bindParam(":img", $item->img);
        $stmt->bindParam(":price", $item->price);
        $stmt->bindParam(":old_price", $item->old_price);
        $stmt->bindParam(":disc", $item->discount);
        $stmt->bindParam(":fs", $item->flash_sale);
        return $stmt->execute();
    }

    public function getItems()
    {
        $query = "SELECT i.*, t.name AS type FROM `iProject_Items` i JOIN `iProject_Types` t ON i.type_id = t.id WHERE DATE(`date`) = CURDATE()";
        $this->limit && is_numeric($this->offset) ? $query .= ' LIMIT ' . $this->offset . ',' . $this->limit : null;
        $stmt = $this->db->prepare($query);

        $stmt->execute();
        return $stmt->fetchAll();
    }
}