// This script scans multiple event sheets in a Google Spreadsheet to find email addresses
// that have registered for more than one event, and outputs those emails along with the events
// they registered for to a new sheet called 'MultipleRegistrations'.

function extractMultipleRegistrations() {
  var sheetNames = ["YOUR","SHEET","NAMES"]; // Add your sheet names here
  var masterSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("MultipleRegistrations");

  // Create or clear the master sheet
  if (!masterSheet) {
    masterSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("MultipleRegistrations");
  } else {
    masterSheet.clear(); // Clear existing data
  }

  var dataMap = {}; // Store email as key and event list as value
  var result = [["Email", "Event"]]; // Header for the final sheet

  // Loop through each event sheet
  sheetNames.forEach(function(sheetName) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (!sheet) {
      Logger.log("Sheet '" + sheetName + "' not found.");
      return;
    }

    var data = sheet.getDataRange().getValues(); // Get all data from the sheet
    
    for (var i = 1; i < data.length; i++) { // Start from 1 to skip header row
      var email = data[i][1]; // Email is in Column B (Index 1)

      if (email) {
        if (!dataMap[email]) {
          dataMap[email] = [];
        }
        dataMap[email].push(sheetName); // Add event name to the list for this email
      }
    }
  });

  // Add rows with multiple registrations to the result
  for (var email in dataMap) {
    if (dataMap[email].length > 1) { // Only include emails registered for more than one event
      dataMap[email].forEach(function(eventName) {
        result.push([email, eventName]);
      });
    }
  }

  // Paste results into the new sheet
  if (result.length > 1) {
    masterSheet.getRange(1, 1, result.length, result[0].length).setValues(result);
    Logger.log("Multiple registration details extracted! Check 'MultipleRegistrations' sheet.");
  } else {
    Logger.log("No participants found with multiple registrations.");
  }
}