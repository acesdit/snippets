function prazzSendEmails() {
       var sheetId = "YOUR SHEET ID"; // Google Sheet ID
       var sheetName = "YOUR SHEET NAME"; // Sheet Name
       var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
     
       if (!sheet) {
         Logger.log("❌ Sheet not found. Please check the Sheet Name and ID.");
         return;
       }
     
       var data = sheet.getDataRange().getValues();
       
       // Column indices
       var headerRow = 0;
       var checkboxCol = 0; 
       var typeCol = 0;    
       var emailCol = 0;     
       var sentCol = 0;    
       var idCol = 0;      
     
       var mailReport = [];
       var sentMailCount = 0;
       var maxEmailsPerRun = 50; // Prevent hitting Gmail quota
       
       // Loop through rows to send emails
       for (var i = headerRow; i < data.length; i++) {
         var checkboxStatus = data[i][checkboxCol - 1]; // TRUE/FALSE
         var typeStatus = data[i][typeCol - 1] ? data[i][typeCol - 1].toLowerCase() : ""; // solo/duo
         var sentStatus = data[i][sentCol - 1]; // TRUE/FALSE or empty
         var email = data[i][emailCol - 1];
         var leadName = data[i][2]; // Column A: Lead Name
         var userId = data[i][idCol - 1]; // Column T: ID
     
         // Skip rows with missing or invalid data
         if (!email || !typeStatus || !userId) {
           Logger.log("⚠️ Skipping row " + (i + 1) + " due to missing data.");
           continue;
         }
     
         // Check conditions
         if (checkboxStatus === true && typeStatus === "duo" && !sentStatus) {
           try {
             var htmlTemplate = HtmlService.createHtmlOutputFromFile('p_htest').getContent();
     
             // Replace placeholders with actual values
             htmlTemplate = htmlTemplate
               .replace("{Name}", leadName)
               .replace("{Entry type}", typeStatus.toUpperCase())
               .replace("{ID}", userId);
     
             var subject = "Welcome to the Event!";
             GmailApp.sendEmail(email, subject, "", {
               htmlBody: htmlTemplate,
             });
     
             sheet.getRange(i + 1, sentCol).setValue(true); // Update sent status
             mailReport.push([leadName, email, "✅ Sent"]);
             sentMailCount++;
             
             // Stop if email limit is reached
             if (sentMailCount >= maxEmailsPerRun) {
               Logger.log("⚡ Max email limit reached. Stopping.");
               break;
             }
           } catch (e) {
             Logger.log("❌ Error sending email to: " + email + " - " + e.message);
             mailReport.push([leadName, email, "❌ Failed"]);
           }
         }
       }
     
       if (sentMailCount > 0) {
         sendMailReport(mailReport, sheetId, sheetName);
       } else {
         Logger.log("⚠️ No emails were sent.");
       }
     }
     
     // Send Mail Report to Admin
     function sendMailReport(mailReport, sheetId, sheetName) {
       var adminEmail = "YOUR MAIL ID"; // Admin email
       var subject = "📧 Mail Report: Duo Registrations";
       var body = "Here’s a summary of sent emails:\n\n";
       
       mailReport.forEach(function(row) {
         body += "Lead: " + row[0] + " | Email: " + row[1] + " | Status: " + row[2] + "\n";
       });
     
       if (mailReport.length === 0) {
         body += "No emails were sent.";
       }
     
       GmailApp.sendEmail(adminEmail, subject, body);
       Logger.log("📩 Mail report sent to: " + adminEmail);
     }