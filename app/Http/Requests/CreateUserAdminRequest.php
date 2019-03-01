<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserAdminRequest extends FormRequest
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
            'firstname' =>  'nullable|min:3',
            'lastname' =>  'nullable|min:3',
            'position' =>  'nullable|min:3',
            'email' => 'nullable|email',
            'login' => 'required|min:5|unique:users',
            'password' => 'required|min:6',
            'roles' => 'present|array'
        ];
    }

    public function messages()
    {
        return [
            "login.unique" => __("Login exists")
        ];
    }
}
