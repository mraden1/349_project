(function (window) {
  'use strict';
  var App = window.App || {};

  function editMarker() {
    var newInput = prompt('Enter new information or leave blank to delete marker');
    if (newInput) {
      marker.getPopup().setContent(newInput);
    } else {
      marker.remove();
    }
  }

  function displayPopup() {
    var userInput = prompt("Tell us where the party at");
    if (userInput) { 
      marker.bindPopup(userInput).openPopup();
    } else {
      marker.remove();
    }
    marker.on('dblclick', editMarker);
    return (userInput);
  }

  function onMapClick(e) {
    window.marker = L
      .marker(e.latlng)
      .addTo(map);

    return (displayPopup());
  }
  map.on('click', onMapClick);
  window.App = App;
})(window);