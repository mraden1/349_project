(function (window) {
  'use strict';
  var App = window.App || {};

  function displayPopup() {
    var userInput = prompt('where the party at?');
    if (userInput) { 
      marker.bindPopup(userInput).openPopup();
    }
  }

  function onMapClick(e) {
    window.marker = L
      .marker(e.latlng)
      .addTo(map);
    displayPopup();
  }
  map.on('click', onMapClick);
  window.App = App;
})(window);