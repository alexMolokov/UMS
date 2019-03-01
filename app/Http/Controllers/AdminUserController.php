<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordAdminRequest;
use App\Http\Requests\ChangeProfileAdminRequest;
use App\Http\Requests\CreateUserAdminRequest;
use App\User;
use App\Http\Requests\AdminListUserRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\ListModels;

class AdminUserController extends Controller
{
    public function listUser(AdminListUserRequest $request)
    {
        $listModels = new ListModels("users",
        ['login', 'lastname', 'firstname', 'position', 'email', 'blocked', 'id'],
        ['login', 'lastname', 'email']
        );

        $listModels->setDefaultSort("login", "asc");
        return $listModels->getPaginate($request);
    }

    public function getUser($id)
    {
       $user = User::find($id);
        if(!$user) abort(404, __("User not found") . ".");

       $data = $user->toArray() + ["roles" => []];
       $roles = $user->roles()->get();

       foreach($roles as $role)
       {
           $data["roles"][$role->id] =$role->name;
       }
       return response()->success($data);

    }

    public function updateProfile(ChangeProfileAdminRequest $request, $id)
    {
        $data = $request->only('firstname', 'lastname', 'position', 'email', 'blocked');

        $user = User::find($id);
        $user->update($data);

        $roles = $request->input("roles");
        $user->syncRoles($roles);

        return response()->success();
    }

    public function changePassword(ChangePasswordAdminRequest $request, $id)
    {
        $password = User::getPasswordHash($request->input('newPassword'));

        User::find($id)->update(["password" => $password]);
        return response()->success();
    }

    public function createUser(CreateUserAdminRequest $request)
    {
        $data = $request->only('login', 'firstname', 'lastname', 'position', 'email');
        $data["password"] = User::getPasswordHash($request->input('password'));
        $data["blocked"] = false;

        $user = User::create($data);

        $roles = $request->input("roles");
        $user->syncRoles($roles);

        return response()->success($user);
    }

}