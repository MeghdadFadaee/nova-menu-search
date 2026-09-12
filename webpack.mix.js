const mix = require('laravel-mix')
const NovaExtension = require('laravel-nova-devtool')

mix.extend('nova', new NovaExtension())

mix
  .setPublicPath('dist')
  .js('resources/js/menu-search.js', 'js')
  .css('resources/css/menu-search.css', 'css')
  .nova('meghdadfadaee/nova-menu-search')
  .version()
