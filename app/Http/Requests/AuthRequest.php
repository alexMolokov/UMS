<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;

class AuthRequest extends FormRequest
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
            'login' => 'bail|required|min:5|alpha_dash',
            'password' => 'bail|required|min:6'
        ];
    }

    protected function formatErrors(Validator $validator)
    {
        $errors = parent::formatErrors($validator);
        $result = [];

        foreach($errors as $name => $error)
        {
            $result[$name] = $error[0];
        }

        return $result;
    }

    public function response(array $errors)
    {
        if ($this->expectsJson()) {
            return response()->error('', $errors);
        }

        return $this->redirector->to($this->getRedirectUrl())
            ->withInput($this->except($this->dontFlash))
            ->withErrors($errors, $this->errorBag);
    }

 }
