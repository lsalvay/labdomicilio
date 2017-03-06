/*
* Dependencias
*/
var gulp = require('gulp'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify');
stylus = require('gulp-stylus');
webserver = require('gulp-webserver');
nib = require('nib');
minifyCSS = require('gulp-minify-css');
/*
* Configuración de las tareas 'demo'
*/

var config = {
	styles: {
		main: './source/css/*',
		watch: './source/css/*',
		output: './build/css'
	},
	js: {
		main: './source/js/*.js',
		watch: './source/js/*.js',
		output: './build/js'
	},
	vendors: {
		main: './source/vendors/*',
		watch: './source/vendors/*',
		output: './build/vendors'
	},
	html: {
		main: './source/*.html',
		watch: './source/*.html',
		output: './build'
	}
}


gulp.task('server', function(){
	gulp.src('./build')
		.pipe(webserver({
			host: '0.0.0.0',
			port: '3000',
			livereload: true
		}));
});

gulp.task('build:css', function(){
	gulp.src(config.styles.main)
		.pipe(stylus({
			use: nib(),
			'include css': true
		}))
		.pipe(minifyCSS())
		.pipe(gulp.dest(config.styles.output));
});


gulp.task('build:js', function () {
gulp.src(config.js.main)
//.pipe(concat('build.js'))
//.pipe(uglify())
.pipe(gulp.dest(config.js.output))
});

gulp.task('vendors:js', function () {
gulp.src(config.vendors.main)
.pipe(gulp.dest(config.vendors.output))
});

gulp.task('build:html', function() {
	gulp.src(config.html.main)
		.pipe(gulp.dest(config.html.output));
});


gulp.task('watch', function(){
	gulp.watch(config.styles.watch, ['build:css']);
	gulp.watch(config.js.watch, ['build:js']);
	gulp.watch(config.vendors.watch, ['vendors:js']);
	gulp.watch(config.html.watch, ['build:html']);
});

gulp.task('build', ['build:css', 'build:js', 'vendors:js', 'build:html']);
gulp.task('default', ['watch', 'build', 'server']);