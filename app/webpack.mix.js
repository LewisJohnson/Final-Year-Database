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

mix
	.js('resources/assets/js/forms.js', 'public/js')
	.js('resources/assets/js/components/project-topics.js', 'public/js')
	.js('resources/assets/js/components/supervisor.js', 'public/js')
	.js('resources/assets/js/main.js', 'public/js')
	.sass('resources/assets/sass/app.scss', 'public/css')
	.sass('resources/assets/sass/admin.scss', 'public/css')
	.sass('resources/assets/sass/supervisor.scss', 'public/css');
// mix.copyDirectory('assets/images', 'public/images');