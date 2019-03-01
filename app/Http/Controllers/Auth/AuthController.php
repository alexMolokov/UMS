<?php

namespace App\Http\Controllers\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

use App\Http\Requests\AuthRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{

    public function login(AuthRequest $request)
    {
       $credentials = $request->only('login', 'password');


       if(Auth::attempt($credentials))
       {
            $user = Auth::user();

            if(!$user->blocked)
            {
                Auth::login($user);
                $data = $user->toArray();

                $data = $data + [
                    "roles" => $this->_getUserRoles($user),
                    "permissions" => $this->_getUserPermissions($user)
                ];
                 return response()->success($data);
            }
       }

        return response()->error(__("Authentication failed!"), []);
    }

    public function logout(Request $request)
    {
        if(Auth::check())
        {
            Auth::logout();
            $request->session()->invalidate();
        }

        return response()->success();
    }

    public function auto()
    {
        if(Auth::check())
        {
            $user = Auth::user();
            Auth::login($user);

            $data = $user->toArray();

            $data = $data + [
                    "roles" => $this->_getUserRoles($user),
                    "permissions" => $this->_getUserPermissions($user)
                ];

            return response()->success($data);
        }

        return response()->error('Not auth');
    }

    private function _getUserRoles($user) {
        $roles = [];
        foreach($user->roles as $role)
            $roles[$role["name"]] = $role["id"];
        return $roles;
    }

    private function _getUserPermissions($user) {
        $permissions = [];
        $allPermissions = $user->getAllPermissions();

        foreach($allPermissions as $permission)
            $permissions[$permission["name"]] = $permission["id"];
        return $permissions;
    }
}
