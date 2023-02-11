<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class GroupSeeder extends Seeder
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
            DB::table('groups')->insert([
                'id' => Str::uuid(),
                'name' => $faker->name,
                'cover_image' => 'https://img-cdn.xemgame.com/2020/05/22/valorant-xac-nhan-se-do-vng-phat-hanh-thumb.jpg',
                'about' => $faker->text,
                'privacy' => 'public',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
