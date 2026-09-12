<?php

namespace MeghdadFadaee\NovaMenuSearch\Tests;

use Laravel\Nova\NovaCoreServiceProvider;
use MeghdadFadaee\NovaMenuSearch\MenuSearchServiceProvider;
use Orchestra\Testbench\TestCase as Orchestra;

abstract class TestCase extends Orchestra
{
    /**
     * @return array<int, class-string>
     */
    protected function getPackageProviders($app): array
    {
        return [
            NovaCoreServiceProvider::class,
            MenuSearchServiceProvider::class,
        ];
    }
}
