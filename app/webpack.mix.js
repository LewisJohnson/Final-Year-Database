let mix = require('laravel-mix');
var webpack = require('webpack');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.disableNotifications();
// mix.sourceMaps();


new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
})

// JAVASCRIPT
mix.js('resources/assets/js/jquery-3.2.1.js', 'public/js');
mix.js('resources/assets/js/jquery-confirm.js', 'public/js');

mix.js('resources/assets/js/main.js', 'public/js');
mix.scripts('resources/assets/js/helpers.js', 'public/js/helpers.js');
mix.scripts('resources/assets/js/config.js', 'public/js/config.js');


// JS | VIEWS
mix.js('resources/assets/js/views/help.js', 'public/js/views');
mix.js('resources/assets/js/views/supervisor.js', 'public/js/views');
mix.js('resources/assets/js/views/supervisor-report.js', 'public/js/views');

// JS | PAGINATION
mix.js('resources/assets/js/dynamic-pagination/projects-pagination.js', 'public/js/pagination');
mix.js('resources/assets/js/dynamic-pagination/user-agent-pagination.js', 'public/js/pagination');

// STYLE
mix.less('resources/assets/sass/jquery-confirm.less', 'public/css');
mix.sass('resources/assets/sass/app.scss', 'public/css');
mix.sass('resources/assets/sass/accessible-contrast.scss', 'public/css');
mix.sass('resources/assets/sass/accessible-font.scss', 'public/css');

mix.browserSync({proxy: 'localhost:8000', notify: false});
