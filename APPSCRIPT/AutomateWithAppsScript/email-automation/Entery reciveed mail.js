function sendEmails() {
       try {
         var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("YOUR SHEET NAME"); // Replace with your sheet name
         if (!sheet) throw new Error("Sheet 'YOUR SHEET NAME' not found.");
     
         var data = sheet.getDataRange().getValues();
         if (data.length <= 1) throw new Error("No data found or only header row present.");
     
         var template;
         try {
           template = HtmlService.createHtmlOutputFromFile('Thank you for registration').getContent();
         } catch (e) {
           throw new Error("HTML template 'Thank you for registration.html' not found.");
         }
     
         var nameIndex = 0;
         var eventName = "Event Name";
         var emailIndex = 0;
         var statusIndex = 0;
         var senderEmail = "example@gmail.com"; // Set your sender email here
     
         if (data[0].length < 4) {
           sheet.getRange(1, 4).setValue("Status");
         }
     
         for (var i = 1; i < data.length; i++) {
           try {
             var name = data[i][nameIndex];
             var email = data[i][emailIndex];
             var status = data[i][statusIndex];
     
             if (status && status !== "") {
               Logger.log("Email skipped for: " + name + " (" + email + ") - Status already set.");
               continue;
             }
     
             if (!name || !email) {
               throw new Error("Missing data in row " + (i + 1) + ".");
             }
     
             var personalizedHtml = template.replace(/{Name}/g, name).replace(/{Event Name}/g, eventName);
     
             GmailApp.sendEmail(email, "Thank you for Registering in: " + eventName, "", { // Using GmailApp
               htmlBody: personalizedHtml,
               from: senderEmail,
               name: "Team"
             });
     
             sheet.getRange(i + 1, statusIndex + 1).setValue("Sent");
             Logger.log("Email sent to: " + name + " (" + email + ")");
     
           } catch (err) {
             sheet.getRange(i + 1, statusIndex + 1).setValue("Error: " + err.message);
             Logger.log("Error sending email to " + data[i][nameIndex] + " (" + data[i][emailIndex] + ") at row " + (i + 1) + ": " + err.message);
           }
         }
     
         Logger.log("Emails processed successfully.");
       } catch (err) {
         Logger.log("Error: " + err.message);
       }
     }