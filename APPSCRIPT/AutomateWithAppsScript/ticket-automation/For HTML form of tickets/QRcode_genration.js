// ✅ Main function to generate and save QR codes
function generateAndSaveQRCodes() {
  var sheetId = "YOUR SHEET ID"; // Replace with your Google Sheet ID
  var sheetName = "YOUR SHEET NAME"; // Replace with your sheet name
  var folderId = "YOUR FOLDER ID"; // Replace with your Google Drive folder ID

  // Open the sheet and get data
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  if (!sheet) {
    Logger.log("Sheet not found. Please check the Sheet ID and Name.");
    return;
  }

  // ✅ Get all columns correctly
  var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues(); // Fetch all columns
  var folder = DriveApp.getFolderById(folderId);
  if (!folder) {
    Logger.log("Folder not found. Please check the Folder ID.");
    return;
  }

  for (var i = 0; i < data.length; i++) {
    var teamID = data[i][2]; // ✅ Now it correctly fetches data from Column G (Index 6)

    if (teamID) {
      var qrUrl = generateQRUrl(teamID);
      if (qrUrl) {
        saveQRCodeToDrive(folder, qrUrl, teamID);
      } else {
        Logger.log("Failed to generate QR URL for Team ID: " + teamID);
      }
    }
  }

  Logger.log("QR Codes generated and saved successfully.");
}

// ✅ Generate QR code URL using QuickChart API
function generateQRUrl(teamID) {
  try {
    var encodedID = encodeURIComponent(teamID.trim()); // Encode to handle special characters
    var qrUrl = "https://quickchart.io/qr?text=" + encodedID + "&size=200x200";
    return qrUrl;
  } catch (e) {
    Logger.log("Error generating QR URL for ID: " + teamID + " - " + e.message);
    return null;
  }
}

// ✅ Save QR Code to Google Drive
function saveQRCodeToDrive(folder, qrUrl, teamID) {
  try {
    var response = UrlFetchApp.fetch(qrUrl, { muteHttpExceptions: true });

    // Check if the response is valid
    if (response.getResponseCode() !== 200) {
      Logger.log("Failed to fetch QR for Team ID: " + teamID + " - Response Code: " + response.getResponseCode());
      return;
    }

    var blob = response.getBlob().setName(teamID + ".png");

    // ✅ Check if file already exists, delete before replacing
    var existingFile = getExistingFile(folder, teamID);
    if (existingFile) {
      existingFile.setTrashed(true); // Move the existing file to trash
    }

    // ✅ Save the new QR file in the folder
    folder.createFile(blob);
    Logger.log("QR Code saved successfully for Team ID: " + teamID);
  } catch (e) {
    Logger.log("Error saving QR for Team ID: " + teamID + " - " + e.message);
  }
}

// ✅ Check if QR file already exists in the folder
function getExistingFile(folder, teamID) {
  var files = folder.getFilesByName(teamID + ".png");
  if (files.hasNext()) {
    return files.next(); // Return the file if it exists
  }
  return null;
}