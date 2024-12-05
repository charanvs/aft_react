<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NavLinksTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('nav_links')->insert([
            ['name' => 'Home', 'url' => '/', 'parent_id' => null, 'order' => 1],
            ['name' => 'Members', 'url' => '/members', 'parent_id' => null, 'order' => 2],
            ['name' => 'Current Members', 'url' => '/members/current', 'parent_id' => 2, 'order' => 1],
            ['name' => 'Past Members', 'url' => '/members/past', 'parent_id' => 2, 'order' => 2],
            ['name' => 'Case Mgmt.', 'url' => '/case-mgmt', 'parent_id' => null, 'order' => 3],
            ['name' => 'Dashboard', 'url' => '/case-mgmt/dashboard', 'parent_id' => 5, 'order' => 1],
            ['name' => 'Track a Case', 'url' => '/case-mgmt/track', 'parent_id' => 5, 'order' => 2],
            ['name' => 'Judgement', 'url' => '/judgement', 'parent_id' => null, 'order' => 4],
            ['name' => 'Vacancies', 'url' => '/vacancies', 'parent_id' => null, 'order' => 5],
        ]);
    }
}
