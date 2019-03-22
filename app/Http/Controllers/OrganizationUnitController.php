<?php

namespace App\Http\Controllers;

use App\OrganizationUnit\TreeFactory;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;


class OrganizationUnitController extends Controller
{
    private $service;

    public function __construct()
    {
        $this->setEncryptServerIOrganizationUnit();
    }

    public function getChildren(Request $request)
    {
        $id =  $request->input("id");

        $tree = TreeFactory::create(Auth::user());
        return response()->success($tree->getChildren($id));
    }


    public function getPaths(Request $request)
    {
       $id =  $request->input("id");
       $user = $this->_getUser($id);

       $tree = TreeFactory::create(Auth::user());

       $result = [];

       $units = $user->organizationUnits()->get();
        foreach($units as $unit){
            $id = $unit->getOriginal("id");
            $result[]  = $tree->getPath($id);
        }

       return response()->success($result);
    }

    private function _getUser($id) {
        $user = User::find($id);
        if(!$user) abort(404, __("User not found") . ".");
        return $user;
    }

    public function copyUsers(Request $request, $copy = true){
        $ouId = $request->input("ou");
        $users = $request->input("users");
        try {
            $response = $this->service->copyUsers($ouId, $users,$copy);
            return response()->success([]);
        } catch (\Exception $e) {
            return response()->error();
        }
    }

    public function moveUsers(Request $request){
        return $this->copyUsers($request, false);
    }

    protected function setEncryptServerIOrganizationUnit()
    {
        $this->service = resolve("EncryptServer\Interfaces\IOrganizationUnit");
    }

}
