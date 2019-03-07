<?php

namespace App\Http\Controllers;

use App\OrganizationUnit\TreeFactory;
use Illuminate\Http\Request;
use App\User;


class OrganizationUnitController extends Controller
{
    public function getChildren(Request $request)
    {
        $id =  $request->input("id");
        $tree = TreeFactory::create($id);
        return response()->success($tree->getChildren());
    }

    public function getPaths(Request $request)
    {
       $id =  $request->input("id");
       $user = $this->_getUser($id);

       $result = [];

       $units = $user->organizationUnits()->get();
        foreach($units as $unit){
            $id = $unit->getOriginal("id");
            $tree = TreeFactory::create($id);
            $result[]  = $tree->getPath();
        }

       return response()->success($result);
    }

    private function _getUser($id) {
        $user = User::find($id);
        if(!$user) abort(404, __("User not found") . ".");
        return $user;
    }

}
