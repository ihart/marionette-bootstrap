'use strict';

var gulp = require('gulp');

gulp.task('icons', function() {

  var svgSymbols = require('gulp-svg-symbols');

  var paths = {
    src: './static/app/components/icon/icons/*.svg',
    dest: './static/dist'
  };

  return gulp.src(paths.src)
    .pipe(svgSymbols({
      templates: ['default-svg']
    }))
    .pipe(gulp.dest(paths.dest));

});
