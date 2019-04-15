<?php

namespace App\Http\Controllers;

use App\Exceptions\Messenger\MessengerException;
use App\Http\Middleware\Messenger\BlockHandler;
use App\Http\Middleware\Messenger\EmailHandler;
use App\Http\Middleware\Messenger\UserProfileHandler;
use App\Http\Requests\Messenger\CreateUserRequest;
use App\ListModelsMessenger;
use App\Order\ActionFactory;
use App\Order\Order;
use App\Order\OrderExecutor;
use Illuminate\Http\Request;
use \EncryptServer\Models\User as MessengerUser;

class UserController extends Controller
{
    private $service;

    public function __construct()
    {
       $this->setEncryptServerIUserInterface();
    }

    public function getUser(Request $request) {
        $data = $request->only(["login"]);
        $response = $this->service->getUserProfile($data["login"]);
        if($response->getStatus())
        {
           $data = $response->getResponse();
           return response()->success($data);
        }
        return response()->error(__("User not found"));
    }

    public function updateProfile(Request $request)
    {
        $request->merge(["action" => ActionFactory::CHANGE_PROFILE]);
        $action = ActionFactory::create($request);
        $order = $action->handle($request->input("order_id"));
        return response()->success([
            "id" => $order->id,
            "order_state_id" => $order->order_state_id
        ]);

    }

    public function block(Request $request)
    {
       $request->merge(["action" => ActionFactory::BLOCK]);
       $action = ActionFactory::create($request);

       $order = $action->handle($request->input("order_id"));

       return response()->success([
               "id" => $order->id,
               "order_state_id" => $order->order_state_id
       ]);

    }

    public function changePassword(Request $request){
        $request->merge(["action" => ActionFactory::CHANGE_PASSWORD]);
        $action = ActionFactory::create($request);

        $order = $action->handle($request->input("order_id"));

        return response()->success([
            "id" => $order->id,
            "order_state_id" => $order->order_state_id
        ]);
    }


    public function createUser(CreateUserRequest $request)
    {
        $request->merge(["action" => ActionFactory::CREATE_USER]);
        $action = ActionFactory::create($request);
        $order = $action->handle($request->input("order_id"));

        $orderData = (array) json_decode($order->data);
        unset($orderData["password"]);

        return response()->success(array_merge([
            "id" => $order->id,
            "order_state_id" => $order->order_state_id
        ],$orderData));
   }


    public function listUser(Request $request) {

        $listModelsMessenger = new ListModelsMessenger($this->service,
            ['login', 'lastname', 'firstname', 'position', 'email', 'blocked'],
            ['login']
        );

        $listModelsMessenger->setDefaultSort("login", "asc");
        return $listModelsMessenger->getPaginate($request);

    }

    public function hasUser(Request $request){
        $request->merge(['page' => 1, 'per_page' => 1, 'sort' => "login.asc", "filter" => new \stdClass()]);
        $result =  $this->listUser($request)->getData();
        return response()->success(["has" => count($result->data) > 0]);

    }


    public function checkCsv(Request $request) {
        $result = [];
        $users = $request->input("users");
        foreach($users as $user) {
            $login = $user["login"];
            $result[$login] = [
                "id" => '',
                "status" => true,
                "statusName" => __("OK")
            ];
            $response = $this->service->find([
                "login" => $user["login"]
            ], ["page" => 0, "count" => 1]);

            $searchResult = $response->getResponse()["searchResult"];

            if($response->getStatus() && $searchResult->getTotal() > 0) {
                $result[$login] = [
                    "status" => false,
                    "statusName" => __("LOGIN_EXISTS")
                ];
            } else {
                $response = $this->service->find([
                    "email" => $user["email"]
                ], ["page" => 0, "count" => 1]);

                $searchResult = $response->getResponse()["searchResult"];

                if ($response->getStatus() && $searchResult->getTotal() > 0) {
                    $result[$login] = [
                        "status" => false,
                        "statusName" => __("EMAIL_EXISTS")
                    ];
                }
            }
        }
        return response()->success($result);
    }

    public function createFromCsv(Request $request){
        $request->merge(["action" => ActionFactory::CREATE_USERS]);

        $action = ActionFactory::create($request);
        $order = $action->handle($request->input("order_id"));

        return response()->success(array_merge([
            "id" => $order->id,
            "order_state_id" => $order->order_state_id
        ]));
    }


    protected function setEncryptServerIUserInterface()
    {
        $this->service = resolve("EncryptServer\Interfaces\IUserInterface");
    }


}

