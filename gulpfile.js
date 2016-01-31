'use strict';

// dependencies
var gulp = require('gulp');

// load specific tasks
require('require-dir')('gulp');

gulp.task('default', [
  'icons',
  'svg',
  'images',
  'video',
  'styles',
  'scripts',
  'sandbox'
]);

gulp.task('watch', [
  'watch:scripts',
  'watch:styles'
]);

gulp.task('watch:sandbox', [
  'watch:sandbox-scripts',
  'watch:styles'
]);

module.exports = gulp;