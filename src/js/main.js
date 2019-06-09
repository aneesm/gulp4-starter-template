/* eslint-env browser */
'use strict';

import jquery from 'jquery';
import accordion from 'modules/accordion.js';

(function ($) {
  $(document).ready(function () {
    ready();

    // Styleguide event when an element is rendered
    $(window).bind("styleguide:onRendered", function (e) {
      ready();
    });
  });

  // Initalizing all modules
  function ready() {
    accordion();
  }
})(jquery);
