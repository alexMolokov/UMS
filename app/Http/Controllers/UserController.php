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
         $blockHandler = new BlockHandler($this->service);
         $UserProfileHandler = new UserProfileHandler($this->service);

        $emailHandler->setNext($blockHandler)->setNext($UserProfileHandler);
        $response = $emailHandler->handle($request);

        if($response->getStatus())
        {
            return response()->success();
        }

        return response()->error(__("Can't update profile"));
    }

    public function listUser(Request $request) {

        $listModelsMessenger = new ListModelsMessenger($this->service,
            ['login', 'lastname', 'firstname', 'position', 'email', 'blocked'],
            ['login']
        );

        $listModelsMessenger->setDefaultSort("login", "asc");
        return $listModelsMessenger->getPaginate($request);

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

    protected function setEncryptServerIUserInterface()
    {
        $this->service = resolve("EncryptServer\Interfaces\IUserInterface");
    }
}

