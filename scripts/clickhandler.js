(function (window) {
  'use strict';
  var App = window.App || {};


  function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
  }

  map.on('click', onMapClick);
  
  window.App = App;
})(window);