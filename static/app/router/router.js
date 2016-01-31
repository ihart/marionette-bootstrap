'use strict';

var Backbone = require('backbone');
var eventBus = require('../util/event-bus');

var Router = Backbone.Router.extend({

  /*isIOS: (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream),*/

  routes: {
    'about(/)': 'about',
    'finish(/)': 'finish'
  },

  about: function () {

    eventBus.trigger('change:state', {state: 'about'}, this);

  },

  finish: function (id) {

    eventBus.trigger('change:state', {state: 'finish'}, this);
  
  }

});

module.exports = new Router();