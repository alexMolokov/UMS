<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangeProfileRequest;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\User;
use Auth;



class ProfileController extends Controller
{
    public function update(ChangeProfileRequest $request)
    {
        $data = $request->only('firstname', 'lastname', 'position', 'email');
        User::where("login", Auth::user()->login)->update($data);
        return response()->success();
     }

    public function changePassword(Request $request)
    {
        $data = $request->only('currentPassword', 'newPassword', 'repeatPassword');

         if(!Auth::attempt(["password" => $data['currentPassword'], "login" => Auth::user()->login]))
                return response()->error(__("Invalid password"), []);

         User::where("login", Auth::user()->login)->update(["password" => User::getPasswordHash($data['newPassword'])]);
         return response()->success();
    }







}
