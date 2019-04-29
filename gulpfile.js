'use strict';

/*----Константы----*/
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const browserSync = require('browser-sync').create();


/*----Очистка папки----*/
function clean() {
	return del(['build']);
}

/*----Перенос статичных файлов и папок----*/
function files() {
	return gulp.src('./src/static/**/**/*.*')
		.pipe(gulp.dest('./build'));
}

/*----Перенос html----*/
function html() {
	return gulp.src('./src/**/*.html')
		.pipe(gulp.dest('./build'))
		.pipe(browserSync.stream());
}

/*----Перенос изображений----*/
function img() {
	return gulp.src('./src/img/**/*.*')
		.pipe(gulp.dest('./build/img'))
}

/*----Сборка стилей----*/
function styles() {
	return gulp.src('./src/sass/**/[^_]*.sass')
		// .pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({ browsers: ['>0.1%'], cascade: false }))
		.pipe(cleanCSS({ level: 2 }))
		.pipe(rename({ suffix: '.min', prefix: '' }))
		// .pipe(sourcemaps.write())
		.pipe(gulp.dest('./build/css'))
		.pipe(browserSync.stream());
}

/*----Сборка скриптов----*/
function scripts() {
	return gulp.src('./src/js/scripts.js')
		// .pipe(sourcemaps.init())
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(uglify({ toplevel: true }))
		.pipe(rename({ suffix: '.min', prefix: '' }))
		// .pipe(sourcemaps.write())
		.pipe(gulp.dest('./build/js'))
		.pipe(browserSync.stream());
}

/*----Отслеживание изменений----*/
function watch() {
	browserSync.init({
		server: {
			baseDir: "./build"
		}
	});
	gulp.watch('./src/*.html', html);
	gulp.watch('./src/img/**/*.*', img);
	gulp.watch('./src/static/**/**/*.*', files);
	gulp.watch('./src/sass/**/*.sass', styles);
	gulp.watch('./src/js/**/*.js', scripts);
}

/*----Таски----*/
gulp.task('del', clean);
gulp.task('html', html);
gulp.task('static', files);
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);

gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts, html, files, img)));
gulp.task('default', gulp.series('build', 'watch'));