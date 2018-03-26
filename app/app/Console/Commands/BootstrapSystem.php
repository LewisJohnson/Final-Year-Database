<?php

namespace SussexProjects\Console\Commands;

use Illuminate\Console\Command;

class BootstrapSystem extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bootstrap:system';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creates a system admin in each department to bootstrap the system.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //todo: this once IDAP is set up 
        // https://laravel.com/docs/5.6/artisan#writing-commands
    }
}
