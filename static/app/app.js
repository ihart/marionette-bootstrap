'use strict';

var Chrome = require('./chrome/chrome');
var eventBus = require('./util/event-bus');
var HandlebarsHelpers = require('./util/handlebars-helpers');
var Marionette = require('backbone.marionette');
var $ = require('jQuery');

HandlebarsHelpers.initialize();

var app = new Marionette.Application();

app.addRegions({
  regionApp: '[data-region="app"]'
});

app.regionApp.show(new Chrome());

module.exports = app;