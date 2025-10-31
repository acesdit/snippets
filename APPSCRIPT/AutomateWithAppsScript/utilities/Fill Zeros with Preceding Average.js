// This script scans specified columns in the active sheet and replaces any zero values
// with the average of all preceding non-zero values in that column.

function fillZerosWithPrecedingAverage() {
  // Get the active spreadsheet
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // Get the active sheet (you can specify a sheet by name if you prefer, e.g., spreadsheet.getSheetByName("Sheet1"))
  const sheet = spreadsheet.getActiveSheet();

  // --- Configuration ---
  // IMPORTANT: Set the static column indices (1-based) you want to process.
  // Use an array for multiple columns.
  // 1 for A, 2 for B, 3 for C, and so on.
  const targetColumnIndices = [2, 3, 5]; // This example targets Columns B, C, and E. Change as needed.
  // --- End Configuration ---

  const lastRow = sheet.getLastRow();
  if (lastRow === 0) {
    // If the sheet is empty, log and alert the user
    console.log("Sheet is empty. No data to process.");
    SpreadsheetApp.getUi().alert('No Data', 'The sheet is empty. No data to process.', SpreadsheetApp.getUi().ButtonSet.OK);
    return;
  }

  // Iterate over each target column
  targetColumnIndices.forEach(columnIndex => {
    // Log which column is being processed
    console.log(`Processing Column: ${sheet.getRange(1, columnIndex).getA1Notation().replace(/\d/g, '')}`);

    // Get all values from the current target column
    // getRange(row, column, numRows, numColumns)
    const columnValues = sheet.getRange(1, columnIndex, lastRow, 1).getValues();

    let precedingValuesSum = 0;    // Sum of preceding non-zero values
    let precedingValuesCount = 0;  // Count of preceding non-zero values

    // Iterate through each cell in the current column
    for (let i = 0; i < columnValues.length; i++) {
      const currentValue = columnValues[i][0]; // Get the value of the current cell

      // Check if the current value is a number
      // typeof value === 'number' checks for number type
      // !isNaN(value) ensures it's a valid number (not NaN)
      // value !== null ensures it's not null
      if (typeof currentValue === 'number' && !isNaN(currentValue) && currentValue !== null) {
        if (currentValue === 0) {
          // If the value is 0, calculate the average of preceding non-zero values
          if (precedingValuesCount > 0) {
            const average = precedingValuesSum / precedingValuesCount;
            columnValues[i][0] = average; // Update the value in our array
            console.log(`Column ${sheet.getRange(1, columnIndex).getA1Notation().replace(/\d/g, '')} Row ${i + 1}: Replaced 0 with average ${average.toFixed(2)}`);
          } else {
            // If there are no preceding non-zero values, keep 0 or decide to skip/handle differently
            console.log(`Column ${sheet.getRange(1, columnIndex).getA1Notation().replace(/\d/g, '')} Row ${i + 1}: Found 0, but no preceding non-zero values to average.`);
            // For now, it remains 0 if no preceding values.
          }
        } else {
          // If the value is a non-zero number, add it to our running sum and count
          precedingValuesSum += currentValue;
          precedingValuesCount++;
        }
      } else {
        // If the cell content is not a numerical value, log it and treat as non-contributing to average
        console.log(`Column ${sheet.getRange(1, columnIndex).getA1Notation().replace(/\d/g, '')} Row ${i + 1}: Non-numerical value found: "${currentValue}". Skipping for average calculation.`);
      }
    }

    // Write all updated values back to the sheet in one go for efficiency for the current column
    sheet.getRange(1, columnIndex, lastRow, 1).setValues(columnValues);
  });

  // Alert the user that the script has completed
  SpreadsheetApp.getUi().alert('Script Complete!', 'Zeros in the specified columns have been replaced with preceding averages (where applicable).', SpreadsheetApp.getUi().ButtonSet.OK);
}

// Run the function to fill zeros with preceding averages