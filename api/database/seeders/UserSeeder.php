<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        $limits = 100;

        for ($i = 0; $i < $limits; $i++) {
            DB::table('users')->insert([
                'id' => Str::uuid(),
                'email' => $faker->email,
                'password' => bcrypt('123456'),
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'phone' => $faker->phoneNumber,
                'address' => $faker->address,
                'city' => $faker->city,
                'country' => $faker->country,
                'date_of_birth' => $faker->date,
                'avatar' => 'https://fakebook-kien2572001.s3.ap-southeast-1.amazonaws.com/images/avatars/01480f29ce376005edcbec0b30cf367d.jpg',
                'created_at' => now(),
                'updated_at' => now(),
                'social_id' => null,
                'social_type' => null,
                'about' => $faker->text(200),
            ]);
        }

        DB::table('users')->insert([
            [
                'id' => Str::uuid(),
                'email' => 'kien@gmail.com',
                'password' => bcrypt('123456'),
                'first_name' => 'Kien',
                'last_name' => 'Nguyen',
                'phone' => '0123456789',
                'address' => 'Ha Noi',
                'city' => 'Ha Noi',
                'country' => 'Viet Nam',
                'date_of_birth' => '1999-01-01',
                'avatar' => 'https://phunugioi.com/wp-content/uploads/2022/03/Avatar-Gau.jpg',
                'created_at' => now(),
                'updated_at' => now(),
                'social_id' => null,
                'social_type' => null,
                'about' => 'I am Kien Nguyen',
            ],
            [
                'id' => Str::uuid(),
                'email' => 'duy@gmail.com',
                'password' => bcrypt('123456'),
                'first_name' => 'Duy',
                'last_name' => 'Nguyen',
                'phone' => '0123456789',
                'address' => 'Ha Noi',
                'city' => 'Ha Noi',
                'country' => 'Viet Nam',
                'date_of_birth' => '1999-01-02',
                'avatar' => 'https://phunugioi.com/wp-content/uploads/2022/03/Avatar-Gau.jpg',
                'created_at' => now(),
                'updated_at' => now(),
                'social_id' => null,
                'social_type' => null,
                'about' => 'I am Duy Nguyen',
            ],
            [
                'id' => Str::uuid(),
                'email' => 'vietanh@gmail.com',
                'password' => bcrypt('123456'),
                'first_name' => 'Viet Anh',
                'last_name' => 'Nguyen',
                'phone' => '0123456789',
                'address' => 'Ha Noi',
                'city' => 'Ha Noi',
                'country' => 'Viet Nam',
                'date_of_birth' => '1999-01-03',
                'avatar' => 'https://phunugioi.com/wp-content/uploads/2022/03/Avatar-Gau.jpg',
                'created_at' => now(),
                'updated_at' => now(),
                'social_id' => null,
                'social_type' => null,
                'about' => 'I am Viet Anh Nguyen',
            ],
            [
                'id' => Str::uuid(),
                'email' => 'manh@gmail.com',
                'password' => bcrypt('123456'),
                'first_name' => 'Manh',
                'last_name' => 'Nguyen',
                'phone' => '0123456789',
                'address' => 'Ha Noi',
                'city' => 'Ha Noi',
                'country' => 'Viet Nam',
                'city' => 'Ha Noi',
                'country' => 'Viet Nam',
                'date_of_birth' => '1999-01-03',
                'avatar' => 'https://phunugioi.com/wp-content/uploads/2022/03/Avatar-Gau.jpg',
                'created_at' => now(),
                'updated_at' => now(),
                'social_id' => null,
                'social_type' => null,
                'about' => 'I am Manh Nguyen',
            ],

        ]);
    }
}
