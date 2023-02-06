<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserFriendRequest extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'target_id' => 'required|exists:users,id|string',
        ];
    }

    public function messages()
    {
        return [
            'target_id.required' => 'User id is required',
            'target_id.exists' => 'User is not exists',
        ];
    }
}
