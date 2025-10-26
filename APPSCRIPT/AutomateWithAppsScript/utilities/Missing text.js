// This script scans specified columns in the active sheet and replaces any empty cells
// with the text "Unknown / Missing" in those columns.

function fillEmptyWithUnknown() {
  // Get the active spreadsheet
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // Get the active sheet (you can specify a sheet by name if you prefer)
  const sheet = spreadsheet.getActiveSheet();

  // --- Configuration ---
  // Set the column indices (1-based) you want to process.
  // Example: [2, 3, 5] for columns B, C, and E.
  const targetColumnIndices = [2, 3, 5]; // Change as needed
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
    const columnValues = sheet.getRange(1, columnIndex, lastRow, 1).getValues();

    // Iterate through each cell in the current column
    for (let i = 0; i < columnValues.length; i++) {
      const currentValue = columnValues[i][0];

      // Check if the cell is empty, null, or only whitespace
      if (currentValue === "" || currentValue === null || (typeof currentValue === "string" && currentValue.trim() === "")) {
        columnValues[i][0] = "Unknown / Missing";
        console.log(`Column ${sheet.getRange(1, columnIndex).getA1Notation().replace(/\d/g, '')} Row ${i + 1}: Empty cell replaced with "Unknown / Missing"`);
      }
    }

    // Write all updated values back to the sheet in one go for efficiency
    sheet.getRange(1, columnIndex, lastRow, 1).setValues(columnValues);
  });

  // Alert the user that the script has completed
  SpreadsheetApp.getUi().alert('Script Complete!', 'Empty cells in the specified columns have been replaced with "Unknown / Missing".', SpreadsheetApp.getUi().ButtonSet.OK);
       console.log("Script completed successfully.");
}