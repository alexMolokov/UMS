<?php

namespace App\Http\Controllers;

use App\Http\Requests\Role\ListRoleRequest;
use App\Http\Requests\Role\RoleRequest;

use App\ListModels;
use Auth;
use App\Role;
use App\Permission;

use App\PermissionsGroup;
use Response;


class RoleController extends Controller
{

    public function createRole(RoleRequest $request)
    {
        $params = $request->only(["name", "description"]);
        Role::create($params);

        return response()->success();
    }

    /**
     * @param $id int
     * @return mixed
     */
    public function get($id)
    {
        $role = $this->getRole($id);

        $result = $role->toArray();
        $this->appendPermissionsToResult($role, $result);
        $this->appendTreeToResult($result);

        return response()->success($result);
    }

    private function appendPermissionsToResult($role, &$result = [])
    {
        $result['permissions'] = [];
        $permissions = $role->permissions()->get();

        foreach($permissions as $permission){
            $result['permissions'][$permission->id] = $permission->pivot->approved;
        }
    }

    private function appendTreeToResult(&$result = [])
    {
        $result["tree"] =  $this->_getPermissionsTree($result['permissions']);
    }

    public function update(RoleRequest $request, $id)
    {
        $params = $request->only(["name", "description", "permissions"]);

        $role = $this->getRole($id);
        if(!$role->is_editable)
            abort(403, __("Forbidden") . ".");

        $role->update([
            "name" => $params["name"],
            "description" => $params["description"]
        ]);
        $role->removeAllPermissions();
        $role->setPermissions($params["permissions"]);

        return response()->success();
    }

    public function delete($id)
    {
        $role = $this->getRole($id);
        if(!$role->can_deleted)
        {
            return response()->json(['error' => 'Forbidden.'], 403);
        }
        $role->delete();
    }

    public function listRole(ListRoleRequest $request){

        $listModels = new ListModels("roles",
            ['name', 'id', 'description'],
            ['name']
        );

        $listModels->setDefaultSort("name", "asc");
        return $listModels->getPaginate($request);
    }


    public function listRoles() {
        $listModels = new ListModels("roles",
            ['name', 'id', "description"],
            ['name']
        );

        $listModels->setDefaultSort("name", "asc");
        $result = $listModels->getRawData();
        return response()->success($result);

    }

    /**
     * return all system permissions as tree
     */
    public function getPermissionsTree($checked = [])
    {
        return Response::json($this->_getPermissionsTree($checked));
    }


    private  function _getPermissionsTree($checked = [])
    {
        $tree = [];
        $keys = array_keys($checked);
        $permissionsGroups = PermissionsGroup::with('permissions')->get();
        foreach($permissionsGroups as $permissionsGroup){

            $group = [
                "text" => __($permissionsGroup->title),
                "children" => [], "expanded" => true,
                "editable" => false,
                "dropable" => false,
                "draggable" => false,
                "data" => ["selectable" => false]
            ];

            foreach($permissionsGroup->permissions as $permission) {
                $group["children"][] = [
                    "text" => __($permission->title),
                    "attributes" => [
                        "approved" => (isset($checked[$permission->id]))? $checked[$permission->id] : false,
                        "is_approved" => $permission->is_approved
                    ],
                    "id" => $permission->id,
                    "data" => ["name" => $permission->name, "selectable" => true],
                    "state" => ["checked" => in_array($permission->id, $keys)],
                ];

            }
            $tree[] = $group;
        }
        return $tree;



    }


    private function getRole($id) {
        $role = Role::find($id);
        if(!$role) abort(404, __("Role not found") . ".");

        return $role;
    }


}

