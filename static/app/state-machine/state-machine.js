'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var eventBus = require('../util/event-bus');

module.exports = Backbone.Model.extend({
  
  defaults: {
    state: 'welcome',
    allStates: [
      'welcome',
      'about',
      'finish'
    ]
  },

  initialize: function () {
  
    eventBus.on('change:state', this.handleStateChange.bind(this));
  
  },

  handleStateChange: function (data) {

    if (_.indexOf(this.get('allStates'), data.state) > -1) {

      this.set('state', data.state);

    } else {

      console.error('State [' + data.state + '] does not exist.');

    }
  
  }

});
