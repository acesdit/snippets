function sendEmailsWithQR() {
  var sheetId = "YOUR SHEET ID"; // Google Sheet ID
  var sheetName = "SHEET NAME"; // Replace with your sheet name
  var folderId = "FOLDER ID"; // Replace with your Google Drive folder ID

  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  var folder = DriveApp.getFolderById(folderId);
  var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();

  var htmlTemplate = HtmlService.createHtmlOutputFromFile('ticket').getContent();
  var mailReport = [];
  var sentCount = 0;

  for (var i = 0; i < data.length; i++) {
    var email = data[i][0];        // Column A - Email Address
    var name = data[i][1];         // Column B - Team Leader Name
    var id = data[i][2];           // Column C - ID
    var location = data[i][3];     // Column D - Location
    var time = data[i][4];         // Column E - Time
    var sentStatus = data[i][5];   // Column F - Sent Status

    // ✅ Skip if already sent
    if (sentStatus === "Sent") {
      continue;
    }

    // ✅ Get the QR file from Drive using ID
    var qrFile = getQRFileById(folder, id);
    if (!qrFile) {
      Logger.log("QR file not found for ID: " + id);
      mailReport.push([name, email, "Failed - QR Code Not Found"]);
      continue;
    }

    // ✅ Use QR file URL for embedding in email
    var qrImageUrl = "https://drive.google.com/uc?export=view&id=" + qrFile.getId();

    // ✅ Replace placeholders in the HTML template
    var htmlBody = htmlTemplate
      .replace("{Name}", name)
      .replace("{Time}", time)
      .replace("{Location}", location)
      .replace("{id}", id)
      .replace("{qr_image}", qrImageUrl);

    try {
      var subject = "Ticket for Treasure Trove: Step Into the World of Illusions!";

      // ✅ Send email with QR as attachment
      GmailApp.sendEmail(email, subject, "", {
        htmlBody: htmlBody,
        attachments: [qrFile.getBlob()],
        name: "" // Attachment name
      });

      // ✅ Mark as sent in Column I
      sheet.getRange(i + 2, 6).setValue("Sent"); // Row starts at 2, Column I
      mailReport.push([name, email, "Sent"]);
      sentCount++;
    } catch (e) {
      Logger.log("Error sending email to: " + email + " - " + e.message);
      mailReport.push([name, email, "Failed - " + e.message]);
    }
  }

  // ✅ Send the mail report
  sendMailReport(mailReport, sentCount);
  Logger.log("Emails sent successfully.");
}

// ✅ Get the QR File from Folder by ID
function getQRFileById(folder, id) {
  var files = folder.getFilesByName(id + ".png");
  if (files.hasNext()) {
    return files.next();
  }
  return null;
}

// ✅ Send Mail Report to Admin
function sendMailReport(mailReport, sentCount) {
  var adminEmail = "ADMIN MAIL ID"; // Admin email for the report
  var subject = "Email Report: Mail Delivery Summary";
  var body = "Total Emails Sent: " + sentCount + "\n\n";
  body += "Summary of mail status:\n\n";

  mailReport.forEach(function(row) {
    body += "Name: " + row[0] + ", Email: " + row[1] + ", Status: " + row[2] + "\n";
  });

  GmailApp.sendEmail(adminEmail, subject, body);
  Logger.log("Mail report sent to admin.");
}