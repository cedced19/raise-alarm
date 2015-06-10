var gulp = require('gulp'),
    gutil = require('gulp-util'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    uncss = require('gulp-uncss'),
    minifyCss = require('gulp-minify-css'),
    htmlmin = require('gulp-htmlmin');


gulp.task('copy', function() {
    gulp.src(['favicon.ico', 'raise-alarm.js', 'package.json', 'README.md'])
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-fonts', function() {
    gulp.src('vendor/fonts/**.*')
        .pipe(gulp.dest('dist/vendor/fonts'));
});

gulp.task('copy-sounds', function() {
    gulp.src('vendor/sounds/**.*')
        .pipe(gulp.dest('dist/vendor/sounds'));
});

gulp.task('html', function () {
    var assets = useref.assets();

    return gulp.src('index.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('dist'));
});

gulp.task('css', ['html'], function () {
    return gulp.src('dist/vendor/styles.css')
        .pipe(uncss({
            html: ['dist/index.html']
        }))
        .pipe(autoprefixer({ 
            browsers: ['last 2 versions', 'ie 8', 'ie 9'] 
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/vendor/'));
});

gulp.task('default', ['css', 'copy', 'copy-sounds', 'copy-fonts']);