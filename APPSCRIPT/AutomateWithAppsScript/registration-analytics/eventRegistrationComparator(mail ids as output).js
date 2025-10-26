// This script compares email registrations across multiple event sheets in a Google Spreadsheet,
// finds the common participant emails between each pair of events, and outputs the results (with email addresses) to a new sheet called 'EventPairs'.

function compareEventRegistrations() {
  var sheetNames = ["YOUR","SHEET","NAMES"]; // List of event sheets

  var masterSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("EventPairs");

  // Create or clear the master sheet
  if (!masterSheet) {
    masterSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("EventPairs");
  } else {
    masterSheet.clear(); // Clear existing data
  }

  var eventData = {}; // Store email sets for each event

  // Read data from each event sheet
  sheetNames.forEach(function(sheetName) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (!sheet) {
      Logger.log("Sheet '" + sheetName + "' not found.");
      return;
    }

    var data = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues(); // Column B (email), excluding header
    var emailSet = new Set();

    // Normalize and add each email to the set
    data.forEach(function(row) {
      var email = row[0];
      if (email) {
        emailSet.add(email.toLowerCase().trim()); // Normalize email
      }
    });

    eventData[sheetName] = emailSet; // Store the set for this event
  });

  var result = [["Event Pair", "Common Emails"]]; // Header row for results

  // Compare all event pairs and collect common emails
  for (var i = 0; i < sheetNames.length - 1; i++) {
    for (var j = i + 1; j < sheetNames.length; j++) {
      var event1 = sheetNames[i];
      var event2 = sheetNames[j];

      // Get array of common emails between the two events
      var commonEmails = Array.from(intersectSets(eventData[event1], eventData[event2]));

      if (commonEmails.length > 0) {
        result.push([event1 + " - " + event2, commonEmails.join(", ")]); // Add result row with emails
      }
    }
  }

  // Paste results in 'EventPairs' sheet
  if (result.length > 1) {
    masterSheet.getRange(1, 1, result.length, result[0].length).setValues(result);
    Logger.log("Event pair comparison complete with email listings.");
  } else {
    Logger.log("No common participants found.");
  }
}

// Helper function to get intersection of two sets
function intersectSets(setA, setB) {
  var intersection = new Set();
  setA.forEach(function(value) {
    if (setB.has(value)) {
      intersection.add(value);
    }
  });
  return intersection;
}
