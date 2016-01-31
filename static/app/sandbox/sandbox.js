'use strict';

var Backbone = require('backbone');
var components = {
  //scrubber: require('../components/video/sandbox/scrubber')
};
var HandlebarsHelpers = require('../util/handlebars-helpers');
var Marionette = require('backbone.marionette');

var getComponent = function () {

  var componentName = location.pathname.substr(location.pathname.lastIndexOf('/') + 1);

  return new components[componentName]();

};

HandlebarsHelpers.initialize();

var app = new Marionette.Application();
app.addRegions({
  regionApp: '[data-region="app"]'
});

app.regionApp.show(getComponent());

module.exports = app;