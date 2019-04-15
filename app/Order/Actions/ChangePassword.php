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
use Illuminate\Support\Facades\Crypt;

class ChangePassword extends Action implements IAction
{

    public function getData() : array
    {


        return [
                "login" => $this->request->input("login"),
                "password" => Crypt::encryptString($this->request->input("newPassword"))
            ];

    }


    public function getSubject() : string {
        return __("Change Password");
    }

    public function getType() {
        return ActionFactory::CHANGE_PASSWORD;
    }

    public function getPermissionName(): string {
        return Permission::MESSENGER_EDIT_USER;
    }

    public function getStartOuId(){
        $service = $this->getUserService();
        $result = $service->find(["login" => $this->request->input("login")]);
        if($result->getStatus())
        {
            $response = $result->getResponse()["searchResult"];

            if($response->valid())
            {
                $user = $response->current();
                $ouId = $user["ou_id"];
                return $ouId;
            }
        }
    }

    public function execute(): Order {

        $service = $this->getUserService();

        $obj = json_decode($this->order->data);

        $result = $service->setPassword($obj->login, Crypt::decryptString($obj->password));

        if($result->getStatus())
        {
            $this->notify(
                ActionFactory::CHANGE_PASSWORD,
                $this->getNotifyData((object) ["login" => $obj->login])
            );
            $this->order->order_state_id = State::DONE;
            return $this->order;
        }

        throw new MessengerException($result->getDescription());

    }

    private function getBlocked() {
        return $this->request->input("blocked");
    }



}