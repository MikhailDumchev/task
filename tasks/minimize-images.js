const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
module.exports = (parameters) => {
    return () => {
        return gulp.src(parameters.src, parameters.options)
                .pipe($.imagemin())
                .pipe(gulp.dest(parameters.destination));
    };
};