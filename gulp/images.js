var gulp = require('gulp');

gulp.task('images', function () {

  var paths = {
    src: ['./static/app/**/*.{gif,jpg,png}'],
    dest: './static/dist'
  };

  return gulp.src(paths.src)
    .pipe(gulp.dest(paths.dest));

});