var gulp = require('gulp');

gulp.task('video', function () {

  var paths = {
    src: ['./static/app/**/*.{mp4,webm,ogv}'],
    dest: './static/dist'
  };

  return gulp.src(paths.src)
    .pipe(gulp.dest(paths.dest));

});