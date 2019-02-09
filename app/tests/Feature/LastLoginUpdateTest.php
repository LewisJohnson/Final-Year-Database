<?php
/**
 * Copyright (C) University of Sussex 2019.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Written by Lewis Johnson <lj234@sussex.com>
 */

namespace Tests\Unit;

use Tests\UserCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LastLoginUpdateTest extends UserCase{

    /**
     * A basic test example.
     *
     * @return void
     */
    public function testLastLoginUpdate()
    {
        dd($this->user);
        $this->assertTrue(true);
    }
}
