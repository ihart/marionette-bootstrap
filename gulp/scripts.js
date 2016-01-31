'use strict';

var args = require('yargs').argv;
var browserify = require('browserify');
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var hbsfy = require('hbsfy');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var strip = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

var appBundler;
var isProduction = args.type === 'production';

var paths = {
  src: './static/app/app.js',
  dest: 'static/dist'
};

var libs = [
  {require: 'backbone', expose: 'backbone'},
  {require: 'backbone.marionette', expose: 'backbone.marionette'},
  {require: 'jquery', expose: 'jquery'},
  {require: 'underscore', expose: 'underscore'}
];

function generateBundle(bundler, name, errorName) {

  hbsfy.configure({
    extensions: ['hbs']
  });

  return bundler
    .bundle()
    .on('error', function(error) {
      console.log('[' + errorName + '] ' + error.message);
    })
    .pipe(source(name))
    .pipe(gulpIf(isProduction, streamify(strip())))
    .pipe(gulpIf(isProduction, streamify(uglify({outSourceMap: false}))))
    .pipe(gulp.dest(paths.dest));

}

function bundleVendor () {

  var vendorBundler = browserify();

  // include only libs
  libs.forEach(function(lib) {
    vendorBundler.require(lib.require, {expose: lib.expose});
  });

  generateBundle(vendorBundler, 'vendor-bundled.js', 'browserify');

}

function bundleApp () {

  var watchifyArgs = watchify.args;
  watchifyArgs.debug = true;
  watchifyArgs.entries = [paths.src];

  appBundler = browserify(watchifyArgs);

  // exclude libs
  libs.forEach(function(lib) {
    appBundler.external(lib.require, {expose: lib.expose});
  });

  generateBundle(appBundler, 'app-bundled.js', 'watchify');

}

function bundleAppFromWatch () {

  // exclude libs
  libs.forEach(function(lib) {
    appBundler.external(lib.require, {expose: lib.expose});
  });

  generateBundle(appBundler, 'app-bundled.js', 'watchify');

}

gulp.task('scripts:vendor', function(done) {

  bundleVendor();

});

gulp.task('scripts:app', function(done) {

  bundleApp();

});

gulp.task('scripts', function(done) {

  bundleVendor();
  bundleApp();

});

gulp.task('watch:scripts', function() {

  appBundler = browserify({
    debug: true,
    entries: [paths.src],
    cache: {},
    packageCache: {},
    plugin: [watchify]
  });

  appBundler.on('update', bundleAppFromWatch);
  appBundler.on('log', function (message) {
    console.log('[watchify] ' + message);
  });
  bundleAppFromWatch();

});