<?php

class Parser
{
    private $products = array();

    public function parseLinks($links)
    {
        foreach ($links as $link) {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_URL, $link['url']);
            $result = curl_exec($ch);
            curl_close($ch);

            $obj = json_decode($result, true);
            $this->createObjects($obj, $link['type_id']);
        }
        return $this->products;
    }

    private function createObjects($oldObject, $type)
    {
        foreach ($oldObject["products"] as $product) {
            $tmp = new stdClass();
            $tmp->id = $product["ID"];
            $tmp->type = $type;
            $tmp->name = $product["name"];
            $tmp->url = $product["URL"];
            $tmp->img = $product["images"][0];
            $tmp->discount = $product["properties"]["discount"][0];

            if (count($product["properties"]["offer_id"]) > 1) {
                $tmp->flash_sale = true;
            } else {
                $tmp->price = $product["price"]["amount"];
                $tmp->old_price = $product["properties"]["fromPrice"][0];
                $tmp->flash_sale = false;
            }
            array_push($this->products, $tmp);
        }
    }
}