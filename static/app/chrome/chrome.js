'use strict';

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var router = require('../router/router');
var Scene = require('../scene/scene');
var $ = require('jQuery');
var StateMachine = require('../state-machine/state-machine');
var template = require('./chrome.hbs');

module.exports = Marionette.LayoutView.extend({

  className: 'Chrome',

  regions: {
    regionHeader: '[data-region="region-header"]',
    regionContent: '[data-region="region-content"]',
    regionFooter: '[data-region="region-footer"]'
  },

  router: null,

  scene: null,

  stateMachine: null,

  initialize: function(attributesModel) {

    this.stateMachine = new StateMachine();

    // Initialise History so Router can trigger state change from URL.
    Backbone.history.start({
      pushState: true
    });

    this.scene = new Scene({
      scene: this.stateMachine.get('state')
    });

    // Now that everything is settled, listen for state changes.
    this.stateMachine.on('change:state', this.onStateChange.bind(this));

  },

  onRender: function () {
  
    this.regionContent.show(this.scene);

  },

  onStateChange: function (model) {
    
    this.scene.update({
      from: model.previous('state'),
      to: model.get('state')
    });
  
  },

  template: function(data) {

    return template(data);

  }

});
