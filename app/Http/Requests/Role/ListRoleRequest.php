<?php

namespace App\Http\Requests\Role;

use App\Http\Requests\ListRequest;

class ListRoleRequest extends ListRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = parent::rules();
        $rules["sort"] = "in:name.asc,name.desc";
        return $rules;
    }

}
