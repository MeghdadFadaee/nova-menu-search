# Nova Menu Search

[![Latest Version on Packagist](https://img.shields.io/packagist/v/meghdadfadaee/nova-menu-search.svg?style=flat-square)](https://packagist.org/packages/meghdadfadaee/nova-menu-search)
[![Total Downloads](https://img.shields.io/packagist/dt/meghdadfadaee/nova-menu-search.svg?style=flat-square)](https://packagist.org/packages/meghdadfadaee/nova-menu-search)
[![License](https://img.shields.io/packagist/l/meghdadfadaee/nova-menu-search.svg?style=flat-square)](LICENSE.md)

Search and navigate the authorized items in a Laravel Nova 5 main menu directly from the sidebar.

## Features

- Works with Nova's default or customized main menu.
- Supports nested menu sections and groups with breadcrumb context.
- Uses Nova's SPA navigation for internal links.
- Supports external GET links and their configured targets.
- Excludes state-changing menu actions such as POST and DELETE links.
- Searches only menu items already authorized and supplied by Nova.
- Handles desktop and responsive sidebars.
- Supports dark mode, RTL layouts, and keyboard access.
- Normalizes common Persian and Arabic character variants.
- Ships with English and Persian translations.
- Requires no migrations, routes, or application-side registration.

## Requirements

- PHP 8.1+
- Laravel 10–13
- Laravel Nova 5.8+

## Installation

This package requires an existing licensed Nova installation. Configure Composer authentication for Nova through Nova's documented mechanism; never commit `auth.json` or credentials. Then install the package:

```bash
composer require meghdadfadaee/nova-menu-search
```

Laravel discovers the service provider automatically. Refresh Nova and use the search field above the main menu. Press `Ctrl+K` on Windows/Linux or `Command+K` on macOS to focus it.

The compiled assets under `dist/` are included in releases, so consuming applications do not need Node.js or an additional build step.

## Configuration

The defaults work without publishing configuration. To customize them:

```bash
php artisan vendor:publish --tag=nova-menu-search-config
```

The published `config/nova-menu-search.php` contains:

```php
return [
    'enabled' => true,
    'placeholder' => null,
    'no_results' => null,
    'shortcut' => 'mod+k',
    'max_results' => 10,
];
```

Set `placeholder` or `no_results` to strings to override their translations. Set `shortcut` to `null` to disable the shortcut. Shortcut values use Nova's Mousetrap syntax.

## How searching works

The package reads Nova's client-side `mainMenu` state after authorization has been applied. It recursively indexes navigable GET links and includes ancestor section/group labels in the searchable text. For example, a query such as `content posts` can match a `Posts` item nested below `Content`.

No server-side search endpoint is added, and hidden or unauthorized menu items are never added to the index. Non-GET items are intentionally excluded because selecting a search result should navigate rather than trigger a state-changing action.

## Development

The project requires access to the private Nova Composer repository:

```bash
composer install
npm install
composer test
npm test
npm run production
vendor/bin/pint --test
```

Rebuild and commit `dist/` whenever frontend source changes. The GitHub Actions workflow always runs credential-free JavaScript and Composer metadata checks. Add `NOVA_USERNAME` and `NOVA_LICENSE_KEY` repository secrets to enable the full PHP integration and production-build checks.

Please see [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a change. Report vulnerabilities according to [SECURITY.md](SECURITY.md), not through a public issue.

## Changelog

Please see [CHANGELOG.md](CHANGELOG.md) for release history.

## License

Nova Menu Search is open-sourced software licensed under the [MIT license](LICENSE.md).
