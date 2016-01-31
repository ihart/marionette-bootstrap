/*

Button - A clickable button element.

Required:

@id (string): An ID which is assigned to a data attribute (data-button) on the Button element.
@label (string): The text for the button.

Optional:

@className (string): Additional CSS classes to add to main element.
@disableOnClick (boolean): If true, the click event listener is removed and a CSS class is added to the Button element (default: false).
@href (string): HREF attribute to be added to the main element.
@newWindow (boolean): If true, the HREF specified will open in a new window.
@onclick (function): A callback for when the button is clicked.

*/

'use strict';

var Backbone = require('backbone')
var Marionette = require('backbone.marionette');
var template = require('./button.hbs');

module.exports = Marionette.LayoutView.extend({

  className: 'Button',

  events: {
    'click': 'handleClick'
  },

  onclick: null,

  tagName: 'button',

  disable: function () {
  
    this.$el[0].classList.add('is-disabled');
    this.$el.off('click');
  
  },

  handleClick: function (e) {

    if (this.model.get('disableOnClick')) {

      this.disable();

    }

    this.onclick(this.model);
  
    this.trigger('click', this.model); // For late binding.
  
  },

  initialize: function(options) {

    this.model = new Backbone.Model({
      className: options.cls || null,
      disableOnClick: options.disableOnClick || false,
      icon: (options.icon) ? { id: options.icon } : null,
      id: options.id,
      label: options.label
    });

    if (options.href) {

      this.$el.attr('href', options.href);

      if (options.newWindow === true) {
        this.$el.attr('target', '_blank');
      }

    }

    this.$el.attr('title', options.label);

    this.onclick = options.onclick || function () {};

  },

  onRender: function() {

    this.el.setAttribute('data-button', this.id);

    if (this.model.get('className')) {
      this.$el.addClass(this.model.get('className'));
    }

  },

  template: function(data) {

    return template(data);

  }

});
