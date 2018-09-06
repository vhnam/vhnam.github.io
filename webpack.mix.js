let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix
    .js('src/js/bootstrap.js', 'public/js')
    .js('src/js/index.js', 'public/js')
    .js('src/js/blog.js', 'public/js')
    .js('src/js/tutorial.js', 'public/js')

    .sass('src/scss/bootstrap.scss', 'public/css')
    .sass('src/scss/index.scss', 'public/css')
    .sass('src/scss/contact.scss', 'public/css')
    .sass('src/scss/about.scss', 'public/css')
    .sass('src/scss/post.scss', 'public/css')
    .sass('src/scss/list.scss', 'public/css')

    .options({
        postCss: [
            require('postcss-css-variables')()
        ]
    })
;
