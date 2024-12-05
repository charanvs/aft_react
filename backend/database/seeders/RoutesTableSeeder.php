<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoutesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('routes')->insert([
            ['path' => '/', 'component' => 'Home'],
            ['path' => '/judgements', 'component' => 'Judgements'],
            ['path' => '/vacancies', 'component' => 'Vacancies'],
        ]);
    }
}

