'use strict';

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var template = require('./finish.hbs');

module.exports = Marionette.ItemView.extend({

  className: 'Finish',

  template: function(data) {

    return template(data);

  }

});