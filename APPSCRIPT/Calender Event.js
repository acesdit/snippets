function createCalendarEvents() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 5).getValues(); // Get event details
  var calendar = CalendarApp.getDefaultCalendar(); // Use your default calendar
  var eventsCreated = 0; // Counter for events created

  for (var i = 0; i < data.length; i++) {
    var title = data[i][0];      // Event Title
    var date = data[i][1];       // Event Date (YYYY-MM-DD)
    var startTime = data[i][2];  // Start Time (HH:MM)
    var endTime = data[i][3];    // End Time (HH:MM)
    var description = data[i][4] || ''; // Description (optional)

    if (title && date && startTime && endTime) { // Ensure necessary fields are filled
      var startDateTime = new Date(date + 'T' + startTime + ':00');
      var endDateTime = new Date(date + 'T' + endTime + ':00');

      try {
        // Create the event in Google Calendar
        calendar.createEvent(title, startDateTime, endDateTime, { description: description });
        eventsCreated++;
      } catch (error) {
        Logger.log("Error creating event: " + title + ", Error: " + error);
      }
    }
  }

  Logger.log("Events Created: " + eventsCreated);
}
