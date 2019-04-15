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
use EncryptServer\Exceptions\OrganizationUnitException;
use Illuminate\Support\Facades\Crypt;

class CopyUser extends Action implements IAction
{

    public function getData() : array
    {
        $ouId = $this->request->input("ou");
        $service = $this->getUnitService();

        $response = $service->getPath($ouId);
        $path = [];

        if(is_array($response))
        {
            foreach($response as $ou)
                $path[] = $ou->getName();
        }

        return [
            "ou" => $this->request->input("ou"),
            "ou_path" => $path,
            "users" => $this->request->input("users")
        ];

    }


    public function getSubject() : string {
        return __("Copy users");
    }

    public function getType() {
        return ActionFactory::COPY_USER;
    }

    public function getPermissionName(): string {
        return Permission::MESSENGER_EDIT_USER;
    }

    public function getStartOuId(){
       return $this->request->input("ou");
    }

    public function execute(): Order {

        $service = $this->getUnitService();

        $obj = json_decode($this->order->data);


        try {
            $service->copyUsers($obj->ou, $obj->users, true);
            $path = $obj->ou_path;

            foreach($obj->users as $user) {
                $this->notify(ActionFactory::COPY_USER, [
                    "event" =>ActionFactory::COPY_USER,
                    "user_id" => $this->order->created_by,
                    "data" => [
                        "ou_id" => $obj->ou,
                        "ou_name"=> implode("\\", $path),
                        "user_id" => $user
                    ]
                ]);
            }

            $this->order->order_state_id = State::DONE;
            return $this->order;

        } catch (OrganizationUnitException $e) {
            throw new MessengerException($e->getDescription());
        }
    }





}