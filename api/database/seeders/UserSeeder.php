<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            [
                'email' => 'kien@gmail.com',
                'password' => bcrypt('123456'),
                'first_name' => 'Kien',
                'middle_name' => 'Trung',
                'last_name' => 'Nguyen',
                'phone' => '0123456789',
                'address' => 'Ha Noi',
                'date_of_birth' => '1999-01-01',
                'avatar' => 'https://phunugioi.com/wp-content/uploads/2022/03/Avatar-Gau.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'email' => 'duy@gmail.com',
                'password' => bcrypt('123456'),
                'first_name' => 'Duy',
                'middle_name' => 'Van',
                'last_name' => 'Nguyen',
                'phone' => '0123456789',
                'address' => 'Ha Noi',
                'date_of_birth' => '1999-01-02',
                'avatar' => 'https://phunugioi.com/wp-content/uploads/2022/03/Avatar-Gau.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'email' => 'vietanh@gmail.com',
                'password' => bcrypt('123456'),
                'first_name' => 'Viet Anh',
                'middle_name' => 'Van',
                'last_name' => 'Nguyen',
                'phone' => '0123456789',
                'address' => 'Ha Noi',
                'date_of_birth' => '1999-01-03',
                'avatar' => 'https://phunugioi.com/wp-content/uploads/2022/03/Avatar-Gau.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'email' => 'manh@gmail.com',
                'password' => bcrypt('123456'),
                'first_name' => 'Manh',
                'middle_name' => 'Van',
                'last_name' => 'Nguyen',
                'phone' => '0123456789',
                'address' => 'Ha Noi',
                'date_of_birth' => '1999-01-03',
                'avatar' => 'https://phunugioi.com/wp-content/uploads/2022/03/Avatar-Gau.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
