let mix = require('laravel-mix');

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

mix.js('resources/assets/js/main.js', 'public/js')
	.js('resources/assets/js/components/admin.js', 'public/js')
	
mix.sass('resources/assets/sass/app.scss', 'public/css');

// mix.browserSync({proxy: 'localhost:8000', notify: false});
