function sendEmails() {
    var spreadsheetId = "sheet-id";
    // var sheetId = "your-sheet-id";
    
    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    var sheet = spreadsheet.getSheetByName("sheet-name");
    
    var dataRange = sheet.getDataRange();
    var data = dataRange.getValues();
    
    // Define the attachment file ID
    var fileId = "file-id"; // File ID from Google Drive
    
    // Loop through each row in the sheet accoridng to the data
    for (var i = 1; i < data.length; i++) {
      var name = data[i][0];
      var email = data[i][1];
      
      // Create the email body
      var body = "mail body";
      
      var subject="Your Subject";
      
      // Get the file from Google Drive
      var file = DriveApp.getFileById(fileId);
      
      // Create a Blob object from the file
      var blob = file.getBlob();
      
      // Send the email with attachment
      GmailApp.sendEmail(email, subject, body, {
        name:"Your Name",
        attachments: [blob]
      });
    }
  }