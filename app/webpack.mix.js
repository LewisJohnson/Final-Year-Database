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

// mix.disableNotifications();


mix.babel('resources/assets/js/main.js')
	.babel('resources/assets/js/forms.js')
	.babel('resources/assets/js/components/project-topics.js')
	.babel('resources/assets/js/components/supervisor.js')
	.babel('resources/assets/js/components/admin.js')
	.babel('resources/assets/js/components/dialog.js')
	.babel('resources/assets/js/components/data-table.js')
	
mix.sass('resources/assets/sass/app.scss', 'public/css');

// mix.browserSync({proxy: 'localhost:8000', notify: false});
