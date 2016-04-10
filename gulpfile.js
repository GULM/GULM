var gulp   = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');
var copy = require('gulp-copy');
var dependencies = require("./dependencies.json");

gulp.task("copy", function () {
	return gulp.src(dependencies.scripts)
				.pipe(gulp.dest("static/lib/scripts"));
});
