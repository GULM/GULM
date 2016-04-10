var gulp   = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
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
