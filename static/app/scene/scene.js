'use strict';

var $ = require('jquery');
var _ = require('underscore');
var eventBus = require('../util/event-bus');
var Marionette = require('backbone.marionette');
var router = require('../router/router');
var template = require('./scene.hbs');
var scenes = {
  welcome: require('./scenes/welcome/welcome'),
  about: require('./scenes/about/about'),
  finish: require('./scenes/finish/finish')
};

module.exports = Marionette.LayoutView.extend({

  activeRegion: null,

  activeScene: null,

  className: 'Scenes',

  hasData: null,

  isMultiSport: false,

  regions: {
    about: '[data-region-scene="about"]',
    finish: '[data-region-scene="finish"]',
    welcome: '[data-region-scene="welcome"]'
  },

  sceneName: null,

  scenes: null,

  sportType: null,

  videoUrl: null,

  initialize: function(options) {

    // Initialise everything before onShow is called.

    this.scenes = {
      welcome: new scenes['welcome'](),
      about: new scenes['about'](),
      finish: new scenes['finish']()
    };

    // This will be the first scene to render.
    this.setScene(options.scene);

  },

  onShow: function () {

    // Render every Scene so we can start downloading the videos.
    _.each(this.scenes, function (scene, key) {
    
      this[key].show(scene);
    
    }.bind(this));

    this.showScene();
  
  },

  showScene: function () {

    if (this.activeScene) {

      if (this.activeScene.deactivate) {
        this.activeScene.deactivate();  
      }
      this.activeRegion.$el[0].classList.remove('is-active');

    }

    this.activeScene = this.scenes[this.sceneName];

    if (this.activeScene && this.activeScene.activate) {
      this.activeScene.activate();
    }

    this.activeRegion = this[this.sceneName];
    this.activeRegion.$el[0].classList.add('is-active');
  
  },

  template: function(data) {

    return template(data);

  },

  setScene : function(name) {
    
    this.sceneName = name;

  },

  update: function (state) {

    this.setScene(state.to);
    this.showScene();
  
  }

});
