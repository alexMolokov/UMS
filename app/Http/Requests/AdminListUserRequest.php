<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminListUserRequest extends FormRequest
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
            "sort" => "in:login.asc,login.desc,firstname.asc,firstname.desc,lastname.asc,lastname.desc,position.asc,position.desc,email.asc,email.desc",
            "page" => "integer|min:1|max:100",
            "per_page" => "integer|in:10,25,50"
        ];
    }


}
