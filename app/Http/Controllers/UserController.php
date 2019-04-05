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

        $orderData = (array) $order->data;
        unset($orderData["password"]);

        return response()->success(array_merge([
            "id" => $order->id,
            "order_state_id" => $order->order_state_id
        ],$orderData));

       /* $data = $request->only(["firstName", "lastName", "middleName", "nickName", "email", "login", "password", "blocked", "ou"]);
        $user = new MessengerUser($data);

        $response = $this->service->add($user);

        if($response->getStatus())
        {
            unset($data["password"]);
            return response()->success($data);
        }

        return response()->error(__($response->getDescription())); */
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





    public function createFromCsv(Request $request){
        $result = [];
        $users = $request->input("users");

        foreach($users as $user){
            $messengerUser = new MessengerUser([
                "firstName" => $user["firstName"],
                "lastName" => $user["lastName"],
                "middleName" => $user["middleName"],
                "email" =>  $user["email"],
                "login" =>  $user["login"],
                "password" => $user["password"],
                "ou" => $user["ou"][0]
            ]);

            $response = $this->service->add($messengerUser);
            $login = $user["login"];
            $result[$login] = [
                "id" => $user["id"],
                "status" => $response->getStatus(),
                "statusName" => __($response->getDescription())
            ];
        }

        return response()->success($result);

    }


    protected function setEncryptServerIUserInterface()
    {
        $this->service = resolve("EncryptServer\Interfaces\IUserInterface");
    }


}

