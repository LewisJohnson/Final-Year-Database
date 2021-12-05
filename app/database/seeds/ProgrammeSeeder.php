<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProgrammeSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::table('informatics_programmes')->insert([ 'name' => 'Computer Science BSc' ]);
		DB::table('informatics_programmes')->insert([ 'name' => 'Computer Science MComp' ]);
		DB::table('informatics_programmes')->insert([ 'name' => 'Computer Science (w placement) BSc' ]);
		DB::table('informatics_programmes')->insert([ 'name' => 'Computer Science (w placement) MComp' ]);
		DB::table('informatics_programmes')->insert([ 'name' => 'Computer Science and AI BSc' ]);
		DB::table('informatics_programmes')->insert([ 'name' => 'Computer Science and AI (w placement) BSc' ]);
		DB::table('informatics_programmes')->insert([ 'name' => 'Computing for Business and Management BSc' ]);
		DB::table('informatics_programmes')->insert([ 'name' => 'Computing for Business and Management (w placement) BSc' ]);
		DB::table('informatics_programmes')->insert([ 'name' => 'Finance and Technology (FinTech) BSc' ]);
		DB::table('informatics_programmes')->insert([ 'name' => 'Finance and Technology (FinTech) (with a professional placement year) BSc' ]);
		DB::table('informatics_programmes')->insert([ 'name' => 'Games and Multimedia Environments BSc' ]);
		DB::table('informatics_programmes')->insert([ 'name' => 'Games and Multimedia Environments (w placement) BSc' ]);
	}
}
