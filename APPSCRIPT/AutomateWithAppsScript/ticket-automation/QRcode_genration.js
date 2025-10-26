function generateTeamAndQRCode() {
       const spreadsheet = SpreadsheetApp.openById("YOUR SPREADSHEET ID"); // Replace with your actual spreadsheet ID
       const processedSheet = spreadsheet.getSheetByName("YOUR SHEET NAME");
     
       // Check if the sheet exists
       if (!processedSheet) {
         Logger.log("The sheet 'QR and id sheet' was not found.");
         return; // Exit the function if the sheet doesn't exist
       }
     
       const lastRow = processedSheet.getLastRow();
       let lastColumn = processedSheet.getLastColumn(); // Change this from const to let so it can be updated
     
       // Set headers if they don't exist (columns A to G + QR Code URL)
       if (lastRow === 0) {
         // Adding headers if the sheet is empty (first row is header row)
         processedSheet.getRange(1, 1).setValue('Name');
         processedSheet.getRange(1, 2).setValue('Email');
         processedSheet.getRange(1, 3).setValue('Entry Type');
         processedSheet.getRange(1, 5).setValue('Team ID');
         processedSheet.getRange(1, 6).setValue('QR Code URL');  // QR Code URL header in column F
       } else {
         // If headers are missing for "QR Code URL", insert it
         if (processedSheet.getRange(1, lastColumn).getValue() !== 'QR Code URL') {
           processedSheet.insertColumnAfter(lastColumn); // Add "QR Code URL" column after the last column
           processedSheet.getRange(1, lastColumn + 1).setValue('QR Code URL');
         }
       }
     
       // Loop over the rows in ProcessedData sheet (starting from row 2, skipping headers)
       for (let i = 2; i <= lastRow; i++) {
         const row = processedSheet.getRange(i, 1, 1, 3).getValues()[0]; // Get Name, Email, Entry Type
         const name = row[0]; // Column A (Name)
         const email = row[1]; // Column B (Email)
         const entryType = row[2]; // Column C (Entry Type)
         
         // Get the Team ID from Column E (assuming the Team ID is already generated and in this column)
         const teamID = processedSheet.getRange(i, 5).getValue(); // Column E (Team ID)
     
         // Find the first empty column to store the QR Code URL (after the "QR Code URL" column)
         let qrCodeColumn = lastColumn + 1;  // QR Code column comes after the existing columns
     
         // Check if QR Code URL already exists in the QR Code column
         const existingQRCodeURL = processedSheet.getRange(i, qrCodeColumn).getValue(); // Check if QR code exists in the new column
     
         // If QR Code URL already exists, skip QR Code generation
         if (existingQRCodeURL) {
           Logger.log(`QR Code for Team ID ${teamID} already exists: ${existingQRCodeURL}`);
           continue;  // Skip to the next row if QR Code already exists
         }
     
         // If QR Code is missing and Team ID is present, generate and save
         if (teamID) {
           // Generate QR Code URL and Save to Drive
           const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(teamID)}&margin=20`;
           const qrCodeFileURL = saveQRCodeToDrive(teamID, qrCodeURL);  // This now returns just the URL
     
           // Append the QR Code File URL in the first empty column after all data (QR Code URL column)
           processedSheet.getRange(i, qrCodeColumn).setValue(qrCodeFileURL);  // Set QR Code URL
         }
       }
     
       Logger.log("QR Codes generated successfully.");
     }
     
     function saveQRCodeToDrive(teamID, qrCodeURL) {
       const folderID = "YOUR FOLDER ID"; // Folder ID in Google Drive where you want to save the QR code image
       const folder = DriveApp.getFolderById(folderID);
     
       // Fetch the QR code image using the API
       const response = UrlFetchApp.fetch(qrCodeURL);
       const blob = response.getBlob().setName(`${teamID}.png`);
     
       // Save QR code to the specified folder
       const file = folder.createFile(blob);
       
       // Make the file public
       file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
     
       // Log the file object and its URL for debugging
       Logger.log(file);  // Log the file object
       const fileUrl = file.getUrl();  // Correct method to get file URL
       Logger.log(fileUrl);  // Log the URL to verify it's correct
     
       return fileUrl; // Return the URL of the file
     }
     