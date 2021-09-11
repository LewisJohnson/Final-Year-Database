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

let mix = require('laravel-mix');
var webpack = require('webpack');

mix.disableNotifications();

//mix.sourceMaps();
//mix.browserSync({proxy: 'localhost:8000', notify: false});
new webpack.ProvidePlugin({ $: 'jquery', Query: 'jquery' });

// JAVASCRIPT
mix.js([
	'resources/assets/js/jquery.js',
	'resources/assets/js/jquery-taphold.js',
	'resources/assets/js/jquery-confirm.js'
], 'public/js/jquery-bundle.js');

mix.scripts([
	'resources/assets/js/config.js',
	'resources/assets/js/helpers.js'
], 'public/js/helpers.js');

mix.js('resources/assets/js/main.js', 'public/js');
mix.js('resources/assets/js/jquery-helpers.js', 'public/js/jquery-helpers.js');

// JS | VIEWS
mix.js('resources/assets/js/views/tab-view.js', 'public/js/views');
mix.js('resources/assets/js/views/project-preview.js', 'public/js/views');
mix.js('resources/assets/js/views/project-popularity.js', 'public/js/views');
mix.js('resources/assets/js/views/admin.js', 'public/js/views');
mix.js('resources/assets/js/views/supervisor.js', 'public/js/views');
mix.js('resources/assets/js/views/marker-assign.js', 'public/js/views');
mix.js('resources/assets/js/views/project-evaluation.js', 'public/js/views');

mix.js('resources/assets/js/views/admin/assign-student-project.js', 'public/js/views/admin');

// STYLE
mix.less('resources/assets/sass/jquery-confirm.less', 'public/css');
mix.sass('resources/assets/sass/email.scss', 'public/css');
mix.sass('resources/assets/sass/app.scss', 'public/css');
mix.sass('resources/assets/sass/ie.scss', 'public/css');

// ACCESSIBILITY MODES
mix.sass('resources/assets/sass/accessible-contrast.scss', 'public/css');
mix.sass('resources/assets/sass/accessible-font.scss', 'public/css');
mix.sass('resources/assets/sass/accessible-dark-mode.scss', 'public/css');


