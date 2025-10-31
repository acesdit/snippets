function sendPaymentConfirmationEmails() {
       var sheetId = "id"; // Replace with your actual Google Sheet ID
       try {
         var sheet = SpreadsheetApp.openById(sheetId).getSheetByName("Sheet1");
         if (!sheet) throw new Error("Sheet 'Verified' not found.");
     
         var data = sheet.getDataRange().getValues();
         if (data.length <= 1) throw new Error("No data found or only header row present.");
     
         var template;
         try {
           template = HtmlService.createHtmlOutputFromFile('EMAIL TEMPLATE').getContent(); // Ensure the file exists
         } catch (e) {
           throw new Error("HTML template 'EMAIL TEMPLATE.html' not found.");
         }
     
         // Define column indexes (0-based)
         var emailIndex = 0;             // "Email Address"
         var nameIndex = 0;              // "Name [FirstName Surname]"
         var paymentVerifiedIndex = 0;  // "Payment Verified" (Checkbox) column O
         var confirmationMailIndex = 0; // Column P - "Confirmation Mail Sent"
         var senderEmail = "example@gmail.com"; // Replace with your sender email
         var eventName = "Event Name"; // Static Event Name
     
         // Ensure "Confirmation Mail Sent" column exists
         if (data[0][confirmationMailIndex] !== "Confirmation Mail Sent") {
           sheet.getRange(1, confirmationMailIndex + 1).setValue("Confirmation Mail Sent");
           Logger.log("New 'Confirmation Mail Sent' column added.");
         }
     
         for (var i = 1; i < data.length; i++) {
           try {
             var email = data[i][emailIndex];
             var name = data[i][nameIndex];
             var paymentVerified = data[i][paymentVerifiedIndex]; // Checkbox value (true/false)
             var confirmationStatus = data[i][confirmationMailIndex]; // Check if already sent
     
             // Skip if payment is not verified or email already marked as sent
             if (paymentVerified !== true) {
               Logger.log("Skipping: " + name + " (" + email + ") - Payment not verified.");
               continue;
             }
             if (confirmationStatus === "Sent") {
               Logger.log("Skipping: " + name + " (" + email + ") - Email already sent.");
               continue;
             }
     
             if (!email || !name) {
               throw new Error("Missing email or name in row " + (i + 1) + ".");
             }
     
             // Replace placeholders in the HTML template
             var personalizedHtml = template.replace(/{Name}/g, name).replace(/{Event_Name}/g, eventName);
     
             // Send email
             GmailApp.sendEmail(email, "Payment Confirmation for " + eventName, "", {
               htmlBody: personalizedHtml,
               from: senderEmail,
               name: "Team"
             });
     
             //Only update "Confirmation Mail Sent" in Column P
             sheet.getRange(i + 1, confirmationMailIndex + 1).setValue("Sent");
     
             Logger.log("Email sent to: " + name + " (" + email + ")");
     
           } catch (err) {
             sheet.getRange(i + 1, confirmationMailIndex + 1).setValue("Error: " + err.message);
             Logger.log("Error sending email to " + data[i][nameIndex] + " (" + data[i][emailIndex] + "): " + err.message);
           }
         }
     
         Logger.log("Email processing complete.");
       } catch (err) {
         Logger.log("Error: " + err.message);
       }
     }