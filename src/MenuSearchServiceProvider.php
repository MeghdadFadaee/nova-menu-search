<?php

namespace MeghdadFadaee\NovaMenuSearch;

use Illuminate\Support\ServiceProvider;
use Laravel\Nova\Events\ServingNova;
use Laravel\Nova\Nova;

class MenuSearchServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadTranslationsFrom(__DIR__.'/../resources/lang', 'nova-menu-search');

        $this->publishes([
            __DIR__.'/../config/nova-menu-search.php' => config_path('nova-menu-search.php'),
        ], 'nova-menu-search-config');

        Nova::serving(function (ServingNova $event): void {
            if (! config('nova-menu-search.enabled', true)) {
                return;
            }

            Nova::script('nova-menu-search', __DIR__.'/../dist/js/menu-search.js');
            Nova::style('nova-menu-search', __DIR__.'/../dist/css/menu-search.css');
            Nova::provideToScript([
                'novaMenuSearch' => [
                    'label' => trans('nova-menu-search::menu-search.label'),
                    'placeholder' => config('nova-menu-search.placeholder')
                        ?: trans('nova-menu-search::menu-search.placeholder'),
                    'noResults' => config('nova-menu-search.no_results')
                        ?: trans('nova-menu-search::menu-search.no_results'),
                    'shortcut' => config('nova-menu-search.shortcut', 'mod+k'),
                    'maxResults' => max(1, (int) config('nova-menu-search.max_results', 10)),
                ],
            ]);
        });
    }

    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__.'/../config/nova-menu-search.php', 'nova-menu-search');
    }
}
