var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');

gulp.task('default', function() {
    browserify({
        entries: './index.js',
        debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('index.js'))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task("watch", function() {
   gulp.watch(['index.js', './imports/*.js'], ['default']);
});