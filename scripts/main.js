(function (window) {
  'use strict';
  var App = window.App || {};
  var map = L.map('map', {
    center: [33.8823, -117.8851],
    zoom: 16
  });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 22,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // Tuffy Titan Marker
  var customIcon = L.icon({
    iconUrl: 'img/tuffy-transparent.png',
    iconSize: [70, 70],
    iconAnchor: [50, 50], 
  });

  // Create a feature group to manage markers
  var markerGroup = L.featureGroup();

  function createNewMarker(e) {
    var userInput = prompt('Enter Location and Event Information:', 'E.g., Name of Location, Events Occurring, and/or Time of Event');

    if (userInput) {
      var marker = L.marker(e.latlng, { icon: customIcon })
        .bindPopup(userInput)
        .addTo(markerGroup) // Add to the markerGroup
        .openPopup()
        .on('dblclick', editMarker);
      return marker;
    }
  }

  function editMarker() {
    var userInput = prompt('Edit Location and Event Information (Leave blank to delete):');
    if (userInput) {
      this.getPopup().setContent(userInput);
    } else {
      this.remove();
    }
  }

  markerGroup.addTo(map); // Add the marker group to the map

  map.on('click', createNewMarker); // Attach the createNewMarker function directly to the map click event

  window.App = App;
})(window);
