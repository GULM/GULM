var gulp   = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var jshint = require('gulp-jshint');
var copy = require('gulp-copy');
var dependencies = require("./dependencies.json");

gulp.task("copyS", function () {
	return gulp.src(dependencies.scripts)
				.pipe(gulp.dest("static/lib/scripts"));
});

gulp.task("copyC", function () {
	return gulp.src(dependencies.styles)
				.pipe(gulp.dest("static/lib/styles"));
});

gulp.task('lint', function() {
    return gulp.src(dependencies.application)
      .pipe(jshint({ linter: 'jshint' }))
			.pipe(jshint.reporter('default'));
});

gulp.task('concatApp', function() {
  return gulp.src(dependencies.application)
    .pipe(concat('application.min.js'))
    .pipe(uglify({outSourceMap:true, mangle: false }))
    .pipe(gulp.dest('static/js'));
});
