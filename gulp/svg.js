var gulp = require('gulp');
var svgmin = require('gulp-svgmin');

gulp.task('svg', function () {

  var paths = {
    src: ['./static/app/components/**/*.svg', '!./static/app/components/icon/icons/*.svg'],
    dest: './static/dist'
  };

  return gulp.src(paths.src)
    .pipe(svgmin())
    .pipe(gulp.dest(paths.dest));

});