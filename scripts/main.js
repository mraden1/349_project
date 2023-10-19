(function (window) {
  'use strict';
  var App = window.App || {};
  var OnMapClick = onMapClick;

  addEventListener('click', OnMapClick);
  window.App = App;
})(window);