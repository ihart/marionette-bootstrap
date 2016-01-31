'use strict';

var Handlebars = require('hbsfy/runtime');

module.exports = {

  initialize: function() {

    var partials = [
      ['icon', require('../components/icon/icon.hbs')]
    ];

    var i = 0;
    var len = partials.length;

    for (i = 0; i < len; i++) {

      Handlebars.registerPartial(partials[i][0], partials[i][1]);

    }

  }

};
