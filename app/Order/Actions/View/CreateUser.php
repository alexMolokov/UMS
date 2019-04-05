<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 03.04.2019
 * Time: 16:55
 */
namespace App\Order\Actions\View;

use App\Order\Order;

class CreateUser extends View implements IActionView
{
    public function info(Order $order ) : array {
        $data = (array) json_decode($order->data);
        $service = $this->getUnitService();
        $response = $service->getPath($data["ou"]);
        $data["ou_path"] = [];

        if(is_array($response))
        {
            foreach($response as $ou)
            $data["ou_path"][] = $ou->getName();
        }

        unset($data["password"]);

        return $data;
    }
}