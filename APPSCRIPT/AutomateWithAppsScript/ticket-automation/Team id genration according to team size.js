function generateIDs() {
       var ss = SpreadsheetApp.getActiveSpreadsheet();
       var sheetName = "YourSheetName"; // Replace with your sheet name
       var sheet = ss.getSheetByName(sheetName);
     
       if (!sheet) {
         Logger.log("Sheet '" + sheetName + "' not found.");
         return;
       }
     
       var data = sheet.getDataRange().getValues();
       var headers = data[0];
       var entryNameColIndex = 9; // J column is index 9 (0-based)
       var idColumnIndex = headers.indexOf("ID");
       var existingIds = new Set(); // Use a Set for efficient ID tracking
     
       if (idColumnIndex === -1) {
         headers.push("ID");
         sheet.getRange(1, headers.length).setValue("ID");
         idColumnIndex = headers.length - 1;
       }
     
       // Populate existingIds set with IDs from the sheet
       for (var i = 1; i < data.length; i++) {
         var row = data[i];
         if (row[idColumnIndex]) {
           existingIds.add(row[idColumnIndex]);
         }
       }
     
       // Process rows to generate or keep existing IDs
       for (var i = 1; i < data.length; i++) {
         var row = data[i];
         var entryName = row[entryNameColIndex];
     
         // If an ID already exists, keep it
         if (row[idColumnIndex]) {
           continue; // Skip to the next row
         }
     
         // Generate a new ID if none exists
         var generatedId;
         var attempts = 0;
     
         do {
           generatedId = generateSingleID(entryName);
           attempts++;
           if (attempts > 1000) {
             Logger.log("Could not generate unique ID after 1000 attempts for row: " + (i + 1));
             row[idColumnIndex] = "ID Generation Failed";
             break;
           }
         } while (existingIds.has(generatedId));
     
         if (attempts <= 1000) {
           row[idColumnIndex] = generatedId;
           existingIds.add(generatedId);
         }
       }
     
       sheet.getRange(1, 1, data.length, headers.length).setValues(data);
     }
     
     function generateSingleID(entryName) {
  var endSection = "B";
  var baseId = "A";
  var randomDigits = "";
  var digits = "0123456789";
  var digitsLength = digits.length;

  for (var i = 0; i < 5; i++) {
    randomDigits += digits.charAt(Math.floor(Math.random() * digitsLength));
  }

  var middleSection = randomDigits;
  var generatedId = baseId + endSection + middleSection;

  // Map entry types to suffixes
  var typeSuffixMap = {
    "SOLO": "S",
    "DUO": "D",
    "TRIO": "T",
    "QUAD": "Q"
  };

  if (entryName) {
    var upperEntry = entryName.toUpperCase();
    if (typeSuffixMap[upperEntry]) {
      generatedId += typeSuffixMap[upperEntry];
    }
  }

  return generatedId;
}