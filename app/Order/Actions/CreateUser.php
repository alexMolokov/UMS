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

class CreateUser extends Action implements IAction
{

    public function getData() : array
    {
        $data =  $this->request->only([
            "firstName",
            "lastName",
            "middleName",
            "nickName",
            "email",
            "login",
            "password",
            "blocked",
            "ou"
        ]);
        $data["password"] = Crypt::encryptString($data["password"]);
        return $data;
    }


    public function getSubject() : string {
        return __("Create User");
    }

    public function getType() {
        return ActionFactory::CREATE_USER;
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

        $map = User::getMapForSave();
        $request = [];
        foreach($map as $key => $value){
            if(isset($data[$key])) {
                $request[$value] = $data[$key];
            }
        }
        $request["password"] = Crypt::decryptString($data["password"]);

        $user = new User($request);


        $result = $service->add($user);

        if($result->getStatus())
        {
            $this->notify(ActionFactory::CREATE_USER, [
                "event" => ActionFactory::CREATE_USER,
                "user_id" => $this->order->created_by,
                "data" => (object) $data
            ]);
            $this->order->order_state_id = State::DONE;
            return $this->order;
        }

        throw new MessengerException($result->getDescription());

    }
}