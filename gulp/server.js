'use strict';

var gulp = require('gulp');
var webserver = require('gulp-webserver');
 
gulp.task('server', function() {
  gulp.src('static')
    .pipe(webserver({
      host: '0.0.0.0'
    }));
});