function generateIDs() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = "YOUR_SHEET_NAME"; // <<<--- IMPORTANT: Replace with your actual sheet name if different
  var sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    Logger.log("Sheet '" + sheetName + "' not found.");
    return;
  }

  var data = sheet.getDataRange().getValues();
  // Check if there's only a header row or no data
  if (data.length <= 1) {
    Logger.log("No data found in rows below the header. Please add data (Name, Domain, Birthdate) to generate IDs.");
    return;
  }

  var headers = data[0]; // Get header row

  // Define column indices (0-based) for input data
  var nameColIndex = 0;   // Column A: Name
  var domainColIndex = 1; // Column B: Domain
  var dobColIndex = 2;    // Column C: Birthdate

  // --- Find or create the 'ID' column ---
  var idColumnIndex = headers.indexOf("ID");
  if (idColumnIndex === -1) {
    headers.push("ID"); // Add 'ID' to headers if it doesn't exist
    sheet.getRange(1, headers.length).setValue("ID"); // Write 'ID' header to sheet
    idColumnIndex = headers.length - 1; // Update index
  }

  // --- Find or create the 'Status' column ---
  var statusColumnIndex = headers.indexOf("Status");
  if (statusColumnIndex === -1) {
    headers.push("Status"); // Add 'Status' to headers if it doesn't exist
    // Note: If ID was just added, headers.length refers to the next available column
    sheet.getRange(1, headers.length).setValue("Status"); // Write 'Status' header to sheet
    statusColumnIndex = headers.length - 1; // Update index
  }

  var existingIds = new Set(); // For tracking generated IDs to ensure uniqueness
  var processedInputCombinations = new Set(); // For tracking unique input data combinations

  // Populate existingIds and processedInputCombinations sets
  // with data already present in the sheet (from row 2 onwards)
  for (var i = 1; i < data.length; i++) { // Start from the second row (index 1) to skip headers
    var row = data[i];
    
    // Ensure row has enough columns before accessing
    if (row.length > idColumnIndex && row[idColumnIndex] !== undefined && row[idColumnIndex] !== null && row[idColumnIndex] !== "") {
      existingIds.add(row[idColumnIndex]);
    }

    // Create a unique key for the input data combination (Name, Domain, Birthdate)
    var name = row[nameColIndex];
    var domain = row[domainColIndex]; // Domain is included in input combination for uniqueness check
    var birthdate = row[dobColIndex];
    var inputKey = `${name}|${domain}|${birthdate instanceof Date ? birthdate.toISOString() : birthdate}`;
    processedInputCombinations.add(inputKey);
  }

  // Process each row to generate or retain IDs
  for (var i = 1; i < data.length; i++) { // Start from the second row (index 1) to skip headers
    var row = data[i];
    var name = row[nameColIndex];
    var domain = row[domainColIndex]; // Domain is used for the duplicate input check
    var birthdate = row[dobColIndex];

    // Initialize status for the current row
    var rowStatus = "";

    // Create a unique key for the current row's input data
    var currentInputKey = `${name}|${domain}|${birthdate instanceof Date ? birthdate.toISOString() : birthdate}`;

    // --- Error Handling: Check for existing ID first (avoids reprocessing) ---
    // Ensure row has enough columns for ID before accessing
    if (row.length > idColumnIndex && row[idColumnIndex] !== undefined && row[idColumnIndex] !== null && row[idColumnIndex] !== "") {
      rowStatus = "Skipped - ID Exists";
      // Ensure the row data array has enough columns for the status column
      while (row.length <= statusColumnIndex) {
        row.push("");
      }
      row[statusColumnIndex] = rowStatus;
      continue; // Move to the next row without trying to generate a new ID
    }

    // --- Error Handling: Check for duplicate input data combination ---
    // If this is a new row (no existing ID), check if its input combination has already been processed
    // Note: We use the `processedInputCombinations` set to detect duplicates *within the current run*
    // but the initial population covers existing data.
    // For newly generated IDs, `processedInputCombinations` would have been updated.
    // To properly handle this, we need to check if the current input key was *already processed and given an ID*
    // For simplicity, for new rows, if the input key is *already in the set* from a prior row in the *current run*,
    // or from previous data that already had an ID, mark it as duplicate.
    
    // More robust duplicate input check: Only add *after* successful ID generation for new rows
    // To handle current-run duplicates, we need to adjust the initial `processedInputCombinations` population
    // and this check below.
    
    // Let's refine the duplicate input check to only mark as duplicate if another row *already got an ID* for this exact input.
    // This requires re-populating `processedInputCombinations` *only for rows that already have an ID*.
    // And for new rows, we add to it *after* generating an ID.

    // Let's reset processedInputCombinations to only track combinations that *already have an ID*
    // or that *will get an ID* in this run.
    
    // Simplified logic: If the current row's input key has *already resulted in an ID being generated* earlier in this script run,
    // or if it was already associated with an existing ID from the sheet, mark it.
    // This means `processedInputCombinations` should only contain input keys for which an ID has been, or will be, associated.

    // Re-initialize processedInputCombinations to track only successful ID assignments
    var successfulInputCombinations = new Set();
    for (var k = 1; k < data.length; k++) {
        var existingRow = data[k];
        if (existingRow.length > idColumnIndex && existingRow[idColumnIndex] !== undefined && existingRow[idColumnIndex] !== null && existingRow[idColumnIndex] !== "") {
            var existingName = existingRow[nameColIndex];
            var existingDomain = existingRow[domainColIndex];
            var existingBirthdate = existingRow[dobColIndex];
            var existingInputKey = `${existingName}|${existingDomain}|${existingBirthdate instanceof Date ? existingBirthdate.toISOString() : existingBirthdate}`;
            successfulInputCombinations.add(existingInputKey);
        }
    }


    if (successfulInputCombinations.has(currentInputKey)) {
        rowStatus = "Duplicate Input Data - Skipped ID";
        // Optionally, set ID to a placeholder for clarity or leave empty
        // row[idColumnIndex] = "DUPLICATE_INPUT";
        while (row.length <= statusColumnIndex) {
            row.push("");
        }
        row[statusColumnIndex] = rowStatus;
        continue; // Skip ID generation for this row
    }


    var generatedId;
    var attempts = 0;
    var maxAttempts = 1000; // Limit attempts to prevent infinite loops

    // Loop to ensure the generated ID is unique within the sheet
    do {
      generatedId = generateSingleID(name, birthdate); // Domain is NOT used in ID generation
      attempts++;
      if (attempts > maxAttempts) {
        Logger.log("ERROR: Could not generate unique ID after " + maxAttempts + " attempts for row: " + (i + 1));
        row[idColumnIndex] = "ID_GEN_FAILED"; // Mark ID as failed
        rowStatus = "ID Generation Failed"; // Set status
        break; // Exit the do-while loop
      }
    } while (existingIds.has(generatedId)); // Keep trying if the ID is already in use

    // If a unique ID was successfully generated within the limit
    if (attempts <= maxAttempts) {
      row[idColumnIndex] = generatedId; // Assign the new ID to the data array
      existingIds.add(generatedId); // Add the new ID to our set of existing IDs
      successfulInputCombinations.add(currentInputKey); // Mark this input combination as having received an ID
      rowStatus = "ID Generated"; // Set status
    }

    // Ensure the row data array has enough columns for the status column
    while (row.length <= statusColumnIndex) {
      row.push("");
    }
    row[statusColumnIndex] = rowStatus; // Assign final status for the row
  }

  // Write all updated data (including new IDs and Status) back to the sheet
  // Use headers.length for the correct number of columns to write
  sheet.getRange(1, 1, data.length, headers.length).setValues(data);
  Logger.log("ID generation complete.");
}

/**
 * Generates a single, compact ID with an exact length of 10 characters.
 * Structure: TX_25-[NAME_1_CHAR][BIRTHDATE_LAST_DAY_DIGIT_1_CHAR][RANDOM_2_CHARS]
 *
 * Length Breakdown:
 * Base ID (TX_25-)               = 6 characters
 * Name Part                      = 1 character (e.g., 'J', 'A', 'X')
 * Birthdate Last Day Digit Part  = 1 character (e.g., '1' for 1st/11th/21st/31st, '5' for 5th/15th/25th, '0' for 10th/20th/30th, '0' for invalid)
 * Random Part                    = 2 characters (e.g., 'A1', 'XY')
 * Total Length                   = 6 + 1 + 1 + 2 = 10 characters (fixed)
 *
 * @param {string} name The name string from Column A.
 * @param {Date|string} birthdate The birthdate value from Column C (can be Date object or string).
 * @return {string} The generated 10-character fixed-length ID.
 */
function generateSingleID(name, birthdate) {
  var baseId = "YOUR_BASE_ID"; // Fixed 6 characters

  // --- Part 1: Generate Name Part (fixed 1 character) ---
  var namePart = generateNamePart(name);

  // --- Part 2: Generate Birthdate Last Day Digit Part (fixed 1 character) ---
  var birthdateLastDayDigit = "0"; // Default to "0" for invalid/missing birthdate
  if (birthdate instanceof Date && !isNaN(birthdate)) {
    // Get the day of the month as a string (e.g., "1", "15", "30")
    var day = String(birthdate.getDate());
    // Take the last digit of the day (e.g., "1" from "1", "5" from "15", "0" from "30")
    birthdateLastDayDigit = day.slice(-1);
  } else {
    Logger.log("WARNING: Invalid or empty birthdate '" + birthdate + "' for ID generation. Using '0' for birthdate last day digit.");
  }

  // --- Part 3: Generate Random Alpha-Numeric Part (fixed 2 characters) ---
  // This helps ensure uniqueness, especially for people with similar initials/birthdays.
  var randomPart = generateRandomAlphaNumeric(2);

  // --- Assemble the final 10-character ID ---
  var generatedId = baseId + namePart + birthdateLastDayDigit + randomPart;

  return generatedId;
}

/**
 * Helper function to generate a fixed 1-character part of the ID from a person's name.
 * Aims for: The first initial of the name.
 * Returns 'X' if the name is empty or invalid to ensure a fixed length.
 *
 * @param {string} name The input name.
 * @return {string} A 1-character name part.
 */
function generateNamePart(name) {
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return 'X'; // "X" for placeholder (fixed 1 character)
  }
  name = name.trim().toUpperCase();
  return name.charAt(0); // Simply return the first character
}

/**
 * Helper function to generate a string of random alphanumeric characters.
 *
 * @param {number} length The desired fixed length of the alphanumeric string.
 * @return {string} Random alphanumeric string of the specified length.
 */
function generateRandomAlphaNumeric(length) {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var result = '';
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}