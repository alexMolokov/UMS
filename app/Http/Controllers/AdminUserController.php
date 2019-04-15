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
use App\OrganizationUnit\OrganizationUnit;

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
       $data = $user->toArray();

       $data["date_from"] = $this->convertDate($data["date_from"], "Y-m-d", 'd.m.Y');
       $data["date_to"] = $this->convertDate($data["date_to"], "Y-m-d", 'd.m.Y');

       return response()->success($data);
    }

    public function updateProfile(ChangeProfileRequest $request, $id)
    {
        $data = $request->only('firstname', 'lastname', 'position', 'email');
        return $this->updateUser($id, $data, $request);
    }

    public function block(BlockRequest $request, $id) {
        $data = $request->only('blocked');
        if($request->user()->id == $id) {
            return response()->error(__("Action forbidden"));
        }
        return $this->updateUser($id, $data, $request);
    }

    public function setDates(SetDatesRequest $request, $id) {
        $data = $request->only('date_from', 'date_to');

        $data["date_from"] = $this->convertDate($data["date_from"], 'd.m.Y', "Y-m-d");
        $data["date_to"] = $this->convertDate($data["date_to"], 'd.m.Y', "Y-m-d");

        if($this->isDateFromMoreDateTo($data["date_from"], $data["date_to"])) {
            return response()->error(__("Date from more than date to"));
        }

        return $this->updateUser($id, $data, $request);
    }

    private function isDateFromMoreDateTo($date_from, $date_to)
    {
        if(!empty($date_from) && !empty($date_to))
        {
            if(strtotime($date_from) > strtotime($date_to))
            {
                return true;
            }
        }
        return false;
    }

    private function convertDate($date, $formatFrom, $formatTo){
        if(!empty($date)) {
            $dateTime = \DateTime::createFromFormat($formatFrom, $date);
            return   $dateTime->format($formatTo);
        }
        return $date;
    }

    private function updateUser($id, $data, $request) {
        $user = User::find($id);
        if($user->isSuperAdmin() && !$request->user()->isSuperAdmin()) {
            return response()->error(__("Action forbidden"));
        }
        $user->update($data);
        return response()->success();
    }

    public function setRoles(Request $request, $id) {
        $user =  $this->_getUser($id);

        $this->syncRoles($request, $user);



        $this->syncUnits($request, $user);

        return response()->success([]);
    }

    private function syncRoles(Request $request, $user){
        $roles = $request->input("roles");
        $user->syncRoles($roles);
    }

    private function syncUnits(Request $request, $user){
        $units = $request->input("units");

        foreach($units as $unit) {
            OrganizationUnit::firstOrCreate(['id' => $unit]);
        }


        $user->organizationUnits()->sync($units);
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
