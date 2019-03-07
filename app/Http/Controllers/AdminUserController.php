<?php

namespace App\Http\Controllers;

use App\Http\Requests\Admin\SetDatesRequest;
use App\Http\Requests\ChangePasswordAdminRequest;
use App\Http\Requests\ChangeProfileRequest;
use App\Http\Requests\CreateUserAdminRequest;
use App\User;
use App\Http\Requests\AdminListUserRequest;
use App\Http\Requests\Admin\BlockRequest;
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
       $user =  $this->_getUser($id);
       return response()->success($user->toArray());
    }

    public function updateProfile(ChangeProfileRequest $request, $id)
    {
        $data = $request->only('firstname', 'lastname', 'position', 'email');
        return $this->updateUser($id, $data);
    }

    public function block(BlockRequest $request, $id) {
        $data = $request->only('blocked');
        return $this->updateUser($id, $data);
    }

    public function setDates(SetDatesRequest $request, $id) {
        $data = $request->only('date_from', 'date_to');
        return $this->updateUser($id, $data);
    }

    private function updateUser($id, $data) {
        $user = User::find($id);
        $user->update($data);
        return response()->success();
    }

    public function setRoles(Request $request, $id) {
        $roles = $request->input("roles");
        $user =  $this->_getUser($id);
        $user->syncRoles($roles);
        return response()->success([]);
    }

    public function getRoles($id){
        $user =  $this->_getUser($id);
        $roles = $user->roles()->get();

        $result = [];
        foreach($roles as $role)
        {
            $result[$role->id] =$role->name;
        }
        return response()->success($result);
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

    private function _getUser($id) {
        $user = User::find($id);
        if(!$user) abort(404, __("User not found") . ".");
        return $user;
    }

}
