<?php

namespace App\Http\Controllers;

use App\Http\Middleware\Messenger\BlockHandler;
use App\Http\Middleware\Messenger\EmailHandler;
use App\Http\Middleware\Messenger\UserProfileHandler;
use App\Http\Requests\Messenger\CreateUserRequest;
use App\ListModelsMessenger;
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
         $emailHandler = new EmailHandler($this->service);
         $UserProfileHandler = new UserProfileHandler($this->service);

        $emailHandler->setNext($UserProfileHandler);
        $response = $emailHandler->handle($request);


        if($response->getStatus())
        {
            return response()->success();
        }

        return response()->error(__("Can't update profile"));
    }


    public function block(Request $request)
    {
        $blockHandler = new BlockHandler($this->service);
        $response = $blockHandler->handle($request);
        if($response->getStatus())
        {
            return response()->success();
        }

        return response()->error(__("Can't block user"));
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

    public function changePassword(Request $request){
        $login =  $request->input("login");
        $password =  $request->input("newPassword");
        $response = $this->service->setPassword($login, $password);

        if($response->getStatus())
        {
            return response()->success();
        }

        return response()->error(__("Can't change password") . ". " .  __("Please try later") . "!");

    }

    public function createUser(CreateUserRequest $request)
    {
        $data = $request->only(["firstName", "lastName", "middleName", "nickName", "email", "login", "password", "blocked"]);

        $user = new MessengerUser($data);

        $response = $this->service->add($user);

        if($response->getStatus())
        {
            unset($data["password"]);
            return response()->success($data);
        }

        return response()->error(__($response->getDescription()));
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

