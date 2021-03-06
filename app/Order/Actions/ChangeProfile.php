<?php
/**
 * Created by PhpStorm.
 * Descr:
 * User: Alex Molokov
 * Date: 27.03.2019
 * Time: 16:03
 */

namespace App\Order\Actions;

use App\Http\Middleware\Messenger\EmailHandler;
use App\Http\Middleware\Messenger\UserProfileHandler;
use App\Order\ActionFactory;
use App\Order\CalculateAccepter;
use App\Order\Order;
use App\Order\State;
use App\OrganizationUnit\OrganizationUnit;
use App\Permission;
use App\Exceptions\Messenger\MessengerException;

class ChangeProfile extends Action implements IAction
{

    public function getData() : array
    {
        return [
                "login" => $this->request->input("login"),
                "email" => $this->request->input("email"),
                "firstName" => $this->request->input("firstName"),
                "lastName" => $this->request->input("lastName"),
                "middleName" => $this->request->input("middleName"),
                "nickName" => $this->request->input("nickName"),
            ];
    }


    public function getSubject() : string {
        return __("Change Profile");
    }

    public function getType() {
        return ActionFactory::CHANGE_PROFILE;
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
                $blockedUser = $response->current();
                $ouId = $blockedUser["ou_id"];
                return $ouId;
            }
        }
    }

    public function execute(): Order {

        $service = $this->getUserService();

        $obj = json_decode($this->order->data);

        $emailHandler = new EmailHandler($service);
        $userProfileHandler = new UserProfileHandler($service);

        $emailHandler->setNext($userProfileHandler);

        $result = $emailHandler->handle($obj);

        if($result->getStatus())
        {
            $this->notify(
                ActionFactory::CHANGE_PROFILE,
                $this->getNotifyData($obj)
            );

            $this->order->order_state_id = State::DONE;
            return $this->order;
        }

        throw new MessengerException($result->getDescription());

    }
}