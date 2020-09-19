"use strict";
const {
	src,
	dest,
	parallel,
	series,
	watch
} = require('gulp');

// Load plugins

const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const environments = require('gulp-environments');
const development = environments.development;
const production = environments.production;
const browsersync = require('browser-sync').create();
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const connect = require('gulp-connect');

console.log(development);
console.log(production);
// Clean assets

function clear() {
	return src('./dist/*', {
		read: false
	})
		.pipe(clean());
}

// JS function

function js() {
	const source = './src/js/*.js';

	return src(source)
		.pipe(concat('klimax.js'))
		.pipe(dest('./dist/js/'))
		.pipe( development(browsersync.stream()) )
}

// HTML function

function html() {
	const source = './src/view/*.html';

	return src(source)
		.pipe(dest('./dist/view/'))
		.pipe( development(browsersync.stream()) )
}

// CSS function

function css() {
	const source = './src/scss/main.scss';

	return src(source)
		.pipe( development(sourcemaps.init()) )
		.pipe(sass())
		.pipe(rename(function(path){
			path.basename = 'style',
			path.extname = '.min.css'
		}))
		.pipe(cssnano())
		.pipe( development(sourcemaps.write()) )
		.pipe(dest('./dist/css/'))
		.pipe( development(browsersync.stream()) )
}

// SVG function

function svg() {
	const source = './src/svg-sprite-icons/*.svg';

	return src(source)
		.pipe(rename({
			prefix: 'svg-'
		}))
		.pipe(svgmin({
			plugins: [{
				removeViewBox: false
			}]
		}))
		.pipe(svgstore())
		.pipe(dest('./dist/img/'))
		.pipe( development(browsersync.stream()) )
}

// IMG function

function img() {
	const source = './src/img/**/*.*';
	return src(source)
		.pipe(dest('./dist/img/'))
		.pipe( development(browsersync.stream()) )
}

// Watch files

function watchFiles() {
	watch('src/scss/**/*.*', css);
	watch('src/js/**/*.*', js);
	watch('src/view/**/*.*', html);
}

// BrowserSync

function browserSync() {
	browsersync.init({
		server: {
			baseDir: 'dist',
			directory: true
		},
		startPath: "/view/index.html",
		port: 8080
	});
}

// Connect for production

function connectDist() {
	connect.server({
		name: 'Dist App',
		root: 'dist',
		port: 8080,
		livereload: false,
		index: '/view/index.html'
	});
};


// Tasks to define the execution of the functions simultaneously or in series

exports.dev = series(clear, parallel(css, js, html, svg, img), parallel(watchFiles, browserSync));
exports.prod = series(clear, parallel(css, js, html, svg, img), parallel(connectDist));
exports.default = series(clear, parallel(css, js, html, svg, img));
