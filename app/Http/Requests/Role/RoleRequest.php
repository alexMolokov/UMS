<?php

namespace App\Http\Requests\Role;

use Illuminate\Foundation\Http\FormRequest;
use Auth;
use App\Permission;

class RoleRequest extends FormRequest
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
        return [
            'name' =>  'required|min:3|alpha|unique:roles',
            'description' =>  'present|max:100'
        ];


    }

    public function messages()
    {
        return [
            'name.unique' =>  __('Role exists')
        ];


    }

}
