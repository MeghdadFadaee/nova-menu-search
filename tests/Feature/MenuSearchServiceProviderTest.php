<?php

use Laravel\Nova\Events\ServingNova;
use Laravel\Nova\Nova;

beforeEach(function (): void {
    Nova::$scripts = [];
    Nova::$styles = [];
});

it('registers its assets and localized configuration while serving Nova', function (): void {
    ServingNova::dispatch($this->app, request());

    expect(Nova::allScripts())->toHaveCount(1)
        ->and(Nova::allStyles())->toHaveCount(1)
        ->and(Nova::jsonVariables(request())['novaMenuSearch'])->toMatchArray([
            'label' => 'Search main menu',
            'placeholder' => 'Search menu…',
            'noResults' => 'No menu items found.',
            'shortcut' => 'mod+k',
            'maxResults' => 10,
        ]);
});

it('does not register assets when menu search is disabled', function (): void {
    config()->set('nova-menu-search.enabled', false);

    ServingNova::dispatch($this->app, request());

    expect(Nova::allScripts())->toBeEmpty()
        ->and(Nova::allStyles())->toBeEmpty();
});
