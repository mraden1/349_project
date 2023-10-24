(function (window) {
  'use strict';
  var App = window.App || {};
  var popup = L.popup();


  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng)
      .openOn(map);
  }

  map.on('click', onMapClick);
  window.App = App;
})(window);