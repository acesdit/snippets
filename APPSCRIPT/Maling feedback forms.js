// Variables for Form links, Sheet link, and event details
var formLink = "<Add the formlink>";
var sheetLink = "<Sheetlink>";

function sendFeedbackRequest() {
  try {
    var spreadsheet = SpreadsheetApp.openByUrl(sheetLink);

    if (!spreadsheet) {
      Logger.log("Error: Could not open the spreadsheet. Check the sheet link.");
      return;
    }

    var sheet = spreadsheet.getSheetByName("Sheet1"); // Replace "Sheet1" with your actual sheet's name
    if (!sheet) {
      Logger.log("Error: Could not find the sheet. Check the sheet name.");
      return;
    }

    // Assuming Name is in column A, Email is in column B, and "Sent" status is in column C, starting from row 2
    var dataRange = sheet.getRange(2, 1, sheet.getLastRow() - 1, 3);  // Name in column A, Email in column B, Sent status in column C
    var data = dataRange.getValues();

    for (var i = 0; i < data.length; i++) {
      var name = data[i][0];  // Name in column A
      var email = data[i][1]; // Email in column B
      var sentStatus = data[i][2]; // Sent status in column C

      // Skip if email is already sent
      if (sentStatus === 'Sent') {
        Logger.log("Skipping row " + (i + 2) + ": Email already marked as sent.");
        continue; // Skip if already marked as sent
      }

      // Skip if name or email is missing
      if (!name || !email) {
        Logger.log("Skipping row " + (i + 2) + ": Name or Email is missing.");
        continue; 
      }

      // Validate email format
      if (!validateEmail(email)) {
        Logger.log("Invalid email in row " + (i + 2) + ": " + email);
        continue; 
      }

      // Create the email subject and body
      var subject = "We'd Love Your Feedback!";
      var message = "Hi " + name + ",\n\n" +
                    "Thank you for attending our recent HackSeries Roadmap session! We hope you found it informative and engaging.\n"+
                    "To help us improve future sessions, we would love to hear your thoughts. Please take a moment to fill out our feedback form: \n\n" +
                    "🔗:" + formLink + "\n\n" +
                    "Thank you for your time and feedback!\n" +
                    "Best regards,\nTeam ACES";
        
        // Send the email with the feedback link and event details
        MailApp.sendEmail(email, subject, message);
        Logger.log("Email sent successfully to: " + email);

        // Update the "Sent" column to mark it as 'Sent'
        try {
          sheet.getRange(i + 2, 3).setValue('Sent'); // Update the Sent status in column C (i + 2 because data starts at row 2)
          Logger.log("Marked row " + (i + 2) + " as 'Sent'.");
        } catch (updateError) {
          Logger.log("Failed to update Sent status for row " + (i + 2) + ". Error: " + updateError);
        }
    }
  } catch (sheetError) {
    Logger.log("An error occurred while processing the sheet: " + sheetError);
  }
}

// Helper function to validate email format using regex
function validateEmail(email) {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}