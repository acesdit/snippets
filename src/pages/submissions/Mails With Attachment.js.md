---
extension: js
author: PrasannaGH963
category: AppScript
layout: '../../layouts/SubmissionLayout.astro'
title: Mails With Attachment
---
```js
// This Google Apps Script automates the process of sending emails with attachments from Google Sheets and Google Drive. It retrieves email addresses and names from a specific Google Sheet, constructs a custom email message, and attaches a file from Google Drive to each email. Here’s a breakdown of the script:

// 	•	Spreadsheet Access: The script opens the specified Google Sheet by its ID and fetches the data from a designated range.
// 	•	File Attachment: A file from Google Drive is retrieved using its unique file ID and converted to a Blob object for attachment.
// 	•	Email Sending: For each row in the sheet, it sends a personalized email with the specified subject, body, and attachment using the GmailApp.sendEmail function.

// This script helps streamline bulk email communication with attachments, making it useful for sending documents like invitations, certificates, or personalized messages.
//-------------------------------------------------------------------------------------------------------------------------------------------------------------

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
  }```
