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
use Illuminate\Support\Facades\Crypt;
use \EncryptServer\Models\User;

class CreateUsers extends Action implements IAction
{

    public function getData() : array
    {
        $data = ["users" => []];

        $users = $this->request->input("users");
        foreach($users as $user)
        {
            $data["users"][] = [
                "firstName" => $user["firstName"],
                "lastName" => $user["lastName"],
                "middleName" => $user["middleName"],
                "email" =>  $user["email"],
                "login" =>  $user["login"],
                "password" => Crypt::encryptString($user["password"]),
                "ou" => $user["ou"][0],
                "ouname" => $user["ouname"]
            ];
        }

        return $data;
    }


    public function getSubject() : string {
        return __("Create Users");
    }

    public function getType() {
        return ActionFactory::CREATE_USERS;
    }

    public function getPermissionName(): string {
        return Permission::MESSENGER_EDIT_USER;
    }

    public function getStartOuId(){
        return $this->request->input("ou");
    }

    public function execute(): Order {

        $service = $this->getUserService();
        $data = (array) json_decode($this->order->data);

        $users = $data["users"];
        foreach($users as $user){
            $user = (array) $user;
            $user["password"] =  Crypt::decryptString($user["password"]);
            $messengerUser = new User([
                "firstName" => $user["firstName"],
                "lastName" => $user["lastName"],
                "middleName" => $user["middleName"],
                "email" =>  $user["email"],
                "login" =>  $user["login"],
                "password" => $user["password"],
                "ou" => $user["ou"]
            ]);
            $result = $service->add($messengerUser);
            if($result->getStatus())
            {
                $data = $user;
                unset($data["password"]);

                $this->notify(ActionFactory::CREATE_USER, [
                    "event" => ActionFactory::CREATE_USER,
                    "user_id" => $this->order->created_by,
                    "data" => (object) $data
                ]);

            }

        }
        $this->order->order_state_id = State::DONE;
        return $this->order;
    }
}