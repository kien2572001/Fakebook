<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'email' => $this->email,
            'lastName' => $this->last_name,
            'firstName' => $this->first_name,
            'phone' => $this->phone,
            'address' => $this->address,
            'city' => $this->city,
            'country' => $this->country,
            'dateOfBirth' => $this->date_of_birth,
            'avatar' => $this->avatar,
            'about' => $this->about,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'gender' =>$this->gender,
        ];
    }
}
