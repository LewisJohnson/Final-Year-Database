<?php

namespace SussexProjects\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Session;
use SussexProjects\ProjectUg;
use SussexProjects\ProjectMasters;

class ProcessDeleteProject implements ShouldQueue{
	use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

	protected $project;

    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 5;

	/**
	 * Create a new job instance.
	 *
	 * @return void
	 */
	public function __construct(ProjectUg $projectUg = null, ProjectMasters $projectMasters = null){
		if($projectUg != null){
			$this->project = $projectUg;
		} elseif($projectMasters != null){
			$this->project = $projectMasters;
		}
	}

	/**
	 * Execute the job.
	 *
	 * @return void
	 */
	public function handle()
	{
		// if(Session::get("db_type") == "ug"){
		// 	$transaction = new TransactionUg;
		// 	$project = ProjectUg::withTrashed()->where('id', $id)->first();
		// } else {
		// 	$project = ProjectMasters::withTrashed()->where('id', $id)->first();
		// 	$transaction = new TransactionMasters;
		// }

		// $transaction->fill(array(
		// 	'transaction_type' =>'deleted',
		// 	'project_id' => $id,
		// 	'supervisor_id' => Auth::user()->supervisor->id,
		// 	'transaction_date' => new Carbon
		// ));
		$this->project->forceDelete();
		// $transaction->save();
	}
}
