function createCalendarEvents() 
{
  var sheet = SpreadsheetApp.openById('1A3Rs7WIQ61K207_7r2n3tAF175-h4ju9Um1m9qm3Mt8').getSheetByName('Calendar-Events');

  //example - sheet id starts from /d/ to /edit in 
  //https://docs.google.com/spreadsheets/d/1A3Rs7WIQ61K207_7r2n3tAF175-h4ju9Um1m9qm3Mt8/edit?gid=1669476589#gid=1669476589
  //and
  //sheet name is 'Bulk-Emails'

  var data = sheet.getDataRange().getValues();
  var calendar = CalendarApp.getDefaultCalendar();

 //run loop, i=1 such that the loop starts reading from row 2 assuming row 1 contains header 
  for (var i = 1; i < data.length; i++) {
    var title = data[i][0];
    var eventStartDate = new Date(data[i][1]);
    var eventEndDate = new Date(data[i][2]);
    var description = data[i][2];
    calendar.createEvent(title, eventStartDate, eventEndDate, {description: description});
  }
}