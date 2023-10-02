
function myFunction() {
  // This function reads birthdates from a google sheet and adds them to a calendar, so you don't have to remember everyone's birthdays!
  var SHEET_ID = "";
  var SHEET_NAME = "";
  var Sheets1 = SpreadsheetApp.openById("SHEET_ID").getSheetByName("SHEET_NAME");

  var file = Sheets1.getDataRange().getValues();//Array of input values
  for(var i=1;i<file.length;i++){
    //Start from 1 to exclude header, if there is no header, start from 0
    date = new Date(file[i][4]);
    now = new Date();
    date.setFullYear(now.getFullYear());
    calendar = CalendarApp.createAllDayEvent(`${file[i][1]}'s Birthday`,date);
    var id = calendar.getId();
    
  }
} 
