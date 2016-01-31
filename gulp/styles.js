'use strict';
 
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var postcssCustomProp = require('postcss-custom-properties');
var postcssImport = require('postcss-import');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  src: './static/app',
  dest: './static/dist',
  postcssImport: '../../' /* Point to node_modules parent relative app.scss */
};

var processors = [
  postcssCustomProp,
  postcssImport({
    path: [paths.postcssImport]
  })
];

function processStyles () {

  gulp.src(paths.src + '/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dest));

}
 
gulp.task('styles', function () {

  processStyles();

});
 
gulp.task('watch:styles', function () {

  processStyles();
  
  gulp.watch(paths.src + '/**/*.scss', ['styles']);

});