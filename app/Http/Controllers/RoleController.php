<?php

namespace App\Http\Controllers;

use App\Http\Requests\Role\ListRoleRequest;
use App\Http\Requests\Role\RoleRequest;

use App\ListModels;
use Illuminate\Http\Request;
use Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use App\PermissionsGroup;
use Response;


class RoleController extends Controller
{

    public function createRole(RoleRequest $request)
    {
        $params = $request->only(["name", "permissions"]);

        $role = Role::create(["name" => $params["name"]]);
        $permissions = Permission::find($params["permissions"]);
        $role->syncPermissions($permissions);
    }

    /**
     * Get info about role - name , can_deleted, permissions - []
     * @param $id int
     * @return mixed
     */
    public function getRole($id)
    {
        $role = $this->_getRole($id);

        $result = $role->toArray();
        $result['permissions'] = [];
        $permissions = $role->permissions()->get();
        foreach($permissions as $permission)
           $result['permissions'][] = $permission->id;
        $result["tree"] =  $this->_getPermissionsTree($result['permissions']);

        return response()->success($result);
    }



    public function updateRole(RoleRequest $request, $id)
    {
        $params = $request->only(["name", "permissions"]);

        $role = $this->_getRole($id);
        $role->update([
            "name" => $params["name"]
        ]);
        $permissions = Permission::find($params["permissions"]);
        $role->syncPermissions($permissions);

        return response()->success();
    }

    public function deleteRole($id)
    {
        $role = $this->_getRole($id);
        if(!$role->can_deleted)
        {
            return response()->json(['error' => 'Forbidden.'], 403);
        }
        $role->delete();
    }

    public function listRole(ListRoleRequest $request){

        $listModels = new ListModels("roles",
            ['name', 'id'],
            ['name']
        );

        $listModels->setDefaultSort("name", "asc");
        return $listModels->getPaginate($request);
    }


    public function listRoles() {
        $listModels = new ListModels("roles",
            ['name', 'id'],
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
        $ar = [];
        $permissionsGroups = PermissionsGroup::with('permissions')->get();
        foreach($permissionsGroups as $permissionsGroup)
        {
            $group = ["text" => __($permissionsGroup->title), "children" => [], "expanded" => true, "editable" => false, "dropable" => false, "draggable" => false, "data" => ["selectable" => false]];
            foreach($permissionsGroup->permissions as $permission)
            {
                $group["children"][] = [
                    "text" => __($permission->title),
                    "id" => $permission->id,
                    "data" => ["name" => $permission->name, "selectable" => true],
                    "state" => ["checked" => in_array($permission->id, $checked)]
                ];

            }
            $ar[] = $group;
        }
        return $ar;



    }


    private function _getRole($id) {
        $role = Role::find($id);
        if(!$role) abort(404, __("Role not found") . ".");

        return $role;
    }


}

