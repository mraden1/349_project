(function (window) {
  "use strict";

  var App = window.App || {};

  var map = L.map("map", {
    center: [33.8823, -117.8851],
    zoom: 16,
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 22,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // Tuffy Titan Marker
  var customIcon = L.icon({
    iconUrl: "img/tuffy-transparent.png",
    iconSize: [70, 70],
    iconAnchor: [50, 50],
  });

  // Create a feature group to manage markers
  var markerGroup = L.featureGroup();

  async function createNewMarker(e) {
    try {
      const res = await fetch("http://localhost:3000/loggedIn", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        //credentials: "include", // Important for cookies
      });
      console.log(res.status);
      console.log(res.statusText);
      if (res.ok) {
        // User is logged in. Go ahead with adding the pin.
      } else {
        // User is not logged in. Don't add the pin.
        alert("You need to log in first.");
        return null;
      }
      var userInput = prompt(
        "Enter Location and Event Information:",
        "E.g., Name of Location, Events Occurring, and/or Time of Event"
      );

      if (userInput) {
        L.marker(e.latlng, { icon: customIcon })
          .bindPopup(userInput)
          .addTo(markerGroup) // Add to the markerGroup
          .openPopup()
          .on("dblclick", editMarker);
        // create object to send to server
        const markerData = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          info: userInput,
        };

        // make POST request
        const res = await fetch("http://localhost:3000/addPin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          //credentials: "include", // Important for cookies
          body: JSON.stringify(markerData),
        });

        // Handle the response
        if (!res.ok) {
          // something went wrong
          console.log("Failed to add pin");
        }
      }
    } catch (error) {
      console.log("Something went wrong:", error);
      alert("Failed to connect to server.");
      return null;
    }
  }

  async function editMarker() {
    var userInput = prompt(
      "Edit Location and Event Information (Leave blank to delete):"
    );
    if (userInput) {
      this.getPopup().setContent(userInput);
    } else {
      this.remove();
    }
  }

  async function loadPins() {
    try {
      const res = await fetch("http://localhost:3000/getPins", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
      });
      if (res.ok) {
        const pins = await res.json();
        pins.forEach(pin => {
          L.marker([pin.lat, pin.lng], { icon: customIcon })
            .bindPopup(pin.info)
            .addTo(markerGroup)
            .on('dblclick', editMarker);
            console.log("added marker")
        });
      } else {
        console.log('Failed to get pins');
      }
    } catch (error) {
      console.log('Something went wrong:', error);
      alert("Failed to connect to server.");
    }
  }
  

  markerGroup.addTo(map);
  map.on("click", createNewMarker);

  document.addEventListener("DOMContentLoaded", function() {
    console.log("adding markers")
    loadPins();
  });

  window.App = App;
})(window);