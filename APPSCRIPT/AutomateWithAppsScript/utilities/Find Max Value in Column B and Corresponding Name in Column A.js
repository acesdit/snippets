// This script finds the highest numerical value in column B of the active sheet
// and displays the corresponding name from column A in the same row.

function findHighestValueAndName() {
  // Get the active spreadsheet
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // Get the active sheet
  const sheet = spreadsheet.getActiveSheet();

  const lastRow = sheet.getLastRow();
  if (lastRow === 0) {
    // If the sheet is empty, log and alert the user
    console.log("Sheet is empty. No data to process.");
    SpreadsheetApp.getUi().alert('No Data', 'The sheet is empty. No data to process.', SpreadsheetApp.getUi().ButtonSet.OK);
    return;
  }

  // Get all values from Column A and Column B
  // getRange(row, column, numRows, numColumns)
  // We get two columns starting from row 1, for all rows that contain data.
  const dataRange = sheet.getRange(1, 1, lastRow, 2); // Gets columns A and B
  const values = dataRange.getValues(); // values[row_index][column_index_within_range]

  let highestValue = -Infinity; // Initialize with the smallest possible number
  let nameAssociatedWithHighestValue = "N/A"; // Default value if no valid numbers are found
  let highestValueRow = -1; // To store the row index (0-based)

  // Iterate through each row to find the highest value in Column B
  // and the corresponding name in Column A
  for (let i = 0; i < values.length; i++) {
    const name = values[i][0]; // Value from Column A (0-indexed in the `values` array)
    const valueB = values[i][1]; // Value from Column B (1-indexed in the `values` array)

    // Check if the value in Column B is a valid number
    if (typeof valueB === 'number' && !isNaN(valueB) && valueB !== null) {
      // If this value is higher than the current highest, update the tracking variables
      if (valueB > highestValue) {
        highestValue = valueB;
        nameAssociatedWithHighestValue = name;
        highestValueRow = i + 1; // Store 1-based row number for logging
      }
    } else {
      // Log if the value is not a valid number
      console.log(`Row ${i + 1}: Value in Column B ("${valueB}") is not a valid number. Skipping.`);
    }
  }

  // Log and alert the result
  if (highestValue !== -Infinity) {
    // If a valid highest value was found, show the result
    const resultMessage = `Highest value found in Column B is: ${highestValue} (Row ${highestValueRow})\n` +
                          `Corresponding name in Column A is: "${nameAssociatedWithHighestValue}"`;
    console.log(resultMessage);
    // Optionally, you can also show an alert to the user
    SpreadsheetApp.getUi().alert('Highest Value Found', resultMessage, SpreadsheetApp.getUi().ButtonSet.OK);
  } else {
    // If no valid numbers were found, alert the user
    const noNumbersMessage = "No valid numerical values found in Column B.";
    console.log(noNumbersMessage);
    SpreadsheetApp.getUi().alert('No Numbers', noNumbersMessage, SpreadsheetApp.getUi().ButtonSet.OK);
  }
}
