(function (window) {
  'use strict';
  var App = window.App || {};
  var popup = L.popup();
  var marker = L.marker();
  

  function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng)
      .openOn(map);
    marker = L.marker(e.latlng).addTo(map);
  }

  map.on('click', onMapClick);
  window.App = App;
})(window);