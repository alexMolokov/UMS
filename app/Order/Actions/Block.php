<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 27.03.2019
 * Time: 16:03
 */

namespace App\Order\Actions;

use App\Order\ActionFactory;
use App\Order\CalculateAccepter;
use App\Order\Order;
use App\Order\State;
use App\OrganizationUnit\OrganizationUnit;
use App\Permission;
use App\Exceptions\Messenger\MessengerException;

class Block extends Action implements IAction
{

    public function getData() : array
    {


        return [
                "login" => $this->request->input("login"),
                "blocked" => $this->getBlocked()
            ];
    }


    public function getSubject() : string {
        if($this->getBlocked())
              return __("Block User");

        return __("Unblock User");
    }

    public function getType() {
        return ActionFactory::BLOCK;
    }

    public function getPermissionName(): string {
        return Permission::MESSENGER_BLOCK_USER;
    }

    public function getStartOuId(){
        $service = $this->getUserService();
        $result = $service->find(["login" => $this->request->input("login")]);
        if($result->getStatus())
        {
            $response = $result->getResponse()["searchResult"];

            if($response->valid())
            {
                $blockedUser = $response->current();
                $ouId = $blockedUser["ou_id"];
                return $ouId;
            }
        }
    }

    public function execute(): Order {

        $service = $this->getUserService();

        $obj = json_decode($this->order->data);

        $result = $service->block($obj->login, $obj->blocked);

        if($result->getStatus())
        {
            $this->notify(ActionFactory::BLOCK, [
                "event" => ActionFactory::BLOCK,
                "user_id" => $this->order->created_by,
                "data" => $obj
            ]);
            $this->order->order_state_id = State::DONE;
            return $this->order;
        }

        throw new MessengerException($result->getDescription());

    }

    private function getBlocked() {
        return $this->request->input("blocked");
    }



}