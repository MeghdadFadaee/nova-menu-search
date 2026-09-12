<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Enable Menu Search
    |--------------------------------------------------------------------------
    |
    | This option controls whether the package registers its Nova script and
    | stylesheet. Disable it to remove menu search without uninstalling the
    | package or deleting its published configuration.
    |
    */

    'enabled' => true,

    /*
    |--------------------------------------------------------------------------
    | Search Placeholder
    |--------------------------------------------------------------------------
    |
    | This text appears inside the sidebar search field. Leave the value null
    | to use the translation supplied by the package for the current locale,
    | or provide a string to override it for this application.
    |
    */

    'placeholder' => null,

    /*
    |--------------------------------------------------------------------------
    | Empty Results Message
    |--------------------------------------------------------------------------
    |
    | This message is displayed when a query does not match any authorized
    | menu item. A null value uses the package translation for the current
    | application locale.
    |
    */

    'no_results' => null,

    /*
    |--------------------------------------------------------------------------
    | Keyboard Shortcut
    |--------------------------------------------------------------------------
    |
    | The shortcut focuses the visible menu search field and uses Nova's
    | Mousetrap syntax. The "mod" key maps to Command on macOS and Control on
    | other platforms. Set this option to null to disable the shortcut.
    |
    */

    'shortcut' => 'mod+k',

    /*
    |--------------------------------------------------------------------------
    | Maximum Results
    |--------------------------------------------------------------------------
    |
    | This value limits how many matching menu links are shown for each query.
    | The package always uses at least one result, even when this value is set
    | to zero or a negative number.
    |
    */

    'max_results' => 10,
];
