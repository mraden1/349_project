(function (window) {
  'use strict';
  var App = window.App ||{};

  document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth'
    });
    calendar.render();

    calendar.on('dateClick', function() {
      var eventTitle = prompt('What event would you like to add?');
      var start = prompt('When does ' + eventTitle + ' begin?');

      calendar.eventDisplay = eventTitle;
      calendar.displayEventTime = start;
  
    });

  });


  window.App = App;
})(window);