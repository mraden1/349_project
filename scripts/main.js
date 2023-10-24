(function (window) {
  'use strict';
  var App = window.App || {};
  var map = L.map('map', {
    center: [33.8823, -117.8851],
    zoom: 16
  });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  function newMarker(e) {
    var userInput = prompt('enter the info');
    if (userInput) {
      var marker =  L.marker(e.latlng)
                    .bindPopup(userInput)
                    .addTo(map)
                    .openPopup()
                    .on('dblclick', editMarker);
      return (marker);
    }
  }

  function editMarker() {
    var userInput = prompt('enter the info again');
    if (userInput) {
      this.getPopup().setContent(userInput);
    } else { 
      this.remove(); 
    }
  }

  var group = L.featureGroup();
  group.extend(map.on('click', newMarker));

  window.App = App;
})(window);