// This script compares email registrations across multiple event sheets in a Google Spreadsheet,
// finds the number of common participants between each pair of events, and outputs the results to a new sheet called 'EventPairs'.

function compareEventRegistrations() {
  // List of sheet names to compare (replace with your actual sheet names)
  var sheetNames = ["YOUR","SHEET","NAMES"]; // Add your sheet names here

  // Get or create the master sheet where results will be stored
  var masterSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("EventPairs");

  // If the master sheet doesn't exist, create it; otherwise, clear its contents
  if (!masterSheet) {
    masterSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("EventPairs");
  } else {
    masterSheet.clear(); // Clear existing data
  }

  var eventData = {}; // Object to store email sets for each event

  // Loop through each event sheet to collect email addresses
  sheetNames.forEach(function(sheetName) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (!sheet) {
      Logger.log("Sheet '" + sheetName + "' not found.");
      return; // Skip if sheet doesn't exist
    }

    // Get all emails from column B, starting from row 2 (to skip header)
    var data = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues();
    var emailSet = new Set();

    // Add each email to a set to ensure uniqueness
    data.forEach(function(row) {
      var email = row[0];
      if (email) {
        emailSet.add(email);
      }
    });
    eventData[sheetName] = emailSet; // Store the set for this event
  });

  var result = [["Event Pair", "Common Registrations"]]; // Header row for results

  // Compare each unique pair of event sheets
  for (var i = 0; i < sheetNames.length - 1; i++) {
    for (var j = i + 1; j < sheetNames.length; j++) {
      var event1 = sheetNames[i];
      var event2 = sheetNames[j];

      // Find common emails between the two events
      var commonEmails = intersectSets(eventData[event1], eventData[event2]);
      result.push([event1 + "-" + event2, commonEmails.size]); // Add result row
    }
  }

  // Write the results to the 'EventPairs' sheet if there are any comparisons
  if (result.length > 1) {
    masterSheet.getRange(1, 1, result.length, result[0].length).setValues(result);
    Logger.log("Event pair comparison complete! Check 'EventPairs' sheet.");
  } else {
    Logger.log("No common participants found.");
  }
}

// Helper function to get intersection of two sets (common emails)
function intersectSets(setA, setB) {
  var intersection = new Set();
  setA.forEach(function(value) {
    if (setB.has(value)) {
      intersection.add(value);
    }
  });
  return intersection;
}