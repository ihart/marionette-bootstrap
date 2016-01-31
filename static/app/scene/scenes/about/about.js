'use strict';

var Backbone = require('backbone');
var Button = require('../../../components/button/button');
var eventBus = require('../../../util/event-bus');
var Marionette = require('backbone.marionette');
var template = require('./about.hbs');

module.exports = Marionette.LayoutView.extend({

  className: 'About',

  regions: {
    regionBtnNext: '[data-region="btn-next"]'
  },

  handleButtonClick: function (e) {

    eventBus.trigger('change:state', {
      state: 'finish'
    });
  
  },

  onShow: function () {

    var btn = new Button({
      icon: 'arrow-next',
      id: 'next',
      label: 'Next',
      onclick: this.handleButtonClick.bind(this)
    });

   this.regionBtnNext.show(btn);
  
  },

  template: function(data) {

    return template(data);

  }

});