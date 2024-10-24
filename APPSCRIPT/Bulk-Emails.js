function sendBulkEmails() 
{
  var sheet = SpreadsheetApp.openById('1A3Rs7WIQ61K207_7r2n3tAF175-h4ju9Um1m9qm3Mt8').getSheetByName('Bulk-Emails');

  //example - sheet id starts from /d/ to /edit in 
  //https://docs.google.com/spreadsheets/d/1A3Rs7WIQ61K207_7r2n3tAF175-h4ju9Um1m9qm3Mt8/edit?gid=1669476589#gid=1669476589
  //and
  //sheet name is 'Bulk-Emails'

  var data = sheet.getDataRange().getValues();
  //gets all the data from the sheet

  //run loop to send emails
  for (var i = 1; i < data.length; i++) 
  {
    var emailAddress = data[i][0];
    var subject = data[i][1];
    var message = data[i][2];
    MailApp.sendEmail(emailAddress, subject, message);
  }
}