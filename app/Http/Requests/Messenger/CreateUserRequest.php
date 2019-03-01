<?php

namespace App\Http\Requests\Messenger;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
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
            'login' => 'required|min:5',
            'firstName' =>  'nullable|min:3',
            'lastName' =>  'nullable|min:3',
            'middleName' =>  'nullable|min:3',
            'nickName' =>  'nullable|min:3',
            'email' => 'nullable|email',
            'blocked' => 'boolean',
            'password' => 'required|min:6',
        ];

    }

    public function messages()
    {
        return [

        ];
    }
}
