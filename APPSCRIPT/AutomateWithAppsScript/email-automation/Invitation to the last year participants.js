function sendBulkEmails() {
  var SHEET_ID = "Sheet ID"; // Replace with your actual Sheet ID
  var SHEET_NAME = "Sheet Name"; // Replace with your sheet name
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  var data = sheet.getDataRange().getValues();
  var template = HtmlService.createHtmlOutputFromFile("LastYear").getContent();

  var sentMails = [];
  var SENDER_NAME = "A"; // Set your sender name
  var EMAIL_SUBJECT = "a"; // Set your email subject

  for (var i = 1; i < data.length; i++) { // Skip header row
    var name = data[i][0];
    var email = data[i][1];
    var status = data[i][2]; // Sent Status column (Column C)

    if (email && (!status || status.trim() === "")) { // Only send if status is empty
      var htmlBody = template.replace("{Name}", name);

      GmailApp.sendEmail(email, EMAIL_SUBJECT, "", {
        htmlBody: htmlBody,
        name: SENDER_NAME
      });

      sheet.getRange(i + 1, 3).setValue("Sent"); // Update Sent Status column
      sentMails.push([name, email, "Sent"]);
    }
  }

  sendMailReport(sentMails, SENDER_NAME, EMAIL_SUBJECT);
}

function sendMailReport(sentMails, SENDER_NAME, EMAIL_SUBJECT) {
  var REPORT_RECIPIENT = "example@gmail.com"; // Replace with the recipient email
  
  if (sentMails.length === 0) {
    Logger.log("No new emails were sent. Skipping report.");
    return;
  }

  var htmlReport = "<html><body>";
  htmlReport += "<h2>Email Sending Report</h2>";
  htmlReport += "<p><strong>Sender:</strong> " + SENDER_NAME + "</p>";
  htmlReport += "<p><strong>Subject:</strong> " + EMAIL_SUBJECT + "</p>";
  htmlReport += "<table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse;'>";
  htmlReport += "<tr><th>Name</th><th>Email</th><th>Status</th></tr>";

  sentMails.forEach(function(row) {
    htmlReport += "<tr>";
    row.forEach(function(cell) {
      htmlReport += "<td>" + cell + "</td>";
    });
    htmlReport += "</tr>";
  });

  htmlReport += "</table></body></html>";

  GmailApp.sendEmail(REPORT_RECIPIENT, "Email Report", "", {
    htmlBody: htmlReport,
    name: SENDER_NAME
  });
}