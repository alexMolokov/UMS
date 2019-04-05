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

class ChangeProfile extends View implements IActionView
{
    public function info(Order $order ) : array {
            $data = json_decode($order->data);
            $result =  ["new" => (array) $data, "old" => []];

            $login = $data->login;

            $service = $this->getUserService();
            $response = $service->getUserProfile($login);

            if($response->getStatus())
            {
                $result["old"] = $response->getResponse();
            }

            return $result;
    }




}