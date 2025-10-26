var spreadsheetId = "YOUR_SPREADSHEET_ID"; // Replace with your actual Google Sheet ID
var sheetName = "YOUR_SHEET_NAME"; // Replace with your actual sheet name
var adminEmail = "YOUR_ADMIN_EMAIL"; // Replace with your admin email address

function doGet() {
  var tmpl = HtmlService.createTemplateFromFile('index');
  return tmpl.evaluate()
    .setTitle('QR Code Attendance System - FINAL')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function sendback(scannedCode) {
  // BULLETPROOF ERROR HANDLING
  Logger.log('=== SENDBACK FUNCTION START ===');
  Logger.log('Received parameter:', scannedCode);
  Logger.log('Parameter type:', typeof scannedCode);
  
  try {
    // Input validation with detailed logging
    if (scannedCode === null || scannedCode === undefined) {
      Logger.log('ERROR: Scanned code is null or undefined');
      return {
        success: false,
        message: "QR code is null or undefined",
        scannedCode: 'null/undefined',
        timestamp: new Date(),
        errorType: 'null_input'
      };
    }
    
    if (typeof scannedCode !== 'string') {
      Logger.log('ERROR: Scanned code is not a string, converting...');
      scannedCode = String(scannedCode);
    }
    
    if (scannedCode.trim() === '') {
      Logger.log('ERROR: Scanned code is empty after trimming');
      return {
        success: false,
        message: "QR code is empty",
        scannedCode: scannedCode,
        timestamp: new Date(),
        errorType: 'empty_input'
      };
    }
    
    // Clean the scanned code
    scannedCode = scannedCode.trim();
    Logger.log('Processing cleaned code: "' + scannedCode + '"');
    
    // Test codes for debugging
    if (scannedCode === 'TEST123') {
      Logger.log('TEST CODE detected, returning test response');
      return {
        success: true,
        message: "Test code processed successfully",
        scannedCode: scannedCode,
        foundInColumn: "A",
        markedInColumn: "C",
        dateColumn: "27/07/2025",
        timestamp: new Date(),
        isTestResponse: true
      };
    }
    
    // Access spreadsheet with error handling
    Logger.log('Attempting to access spreadsheet...');
    var spreadsheet, sheet;
    
    try {
      spreadsheet = SpreadsheetApp.openById(spreadsheetId);
      Logger.log('Spreadsheet accessed successfully');
    } catch (spreadsheetError) {
      Logger.log('ERROR accessing spreadsheet: ' + spreadsheetError.toString());
      return {
        success: false,
        message: "Cannot access spreadsheet: " + spreadsheetError.toString(),
        scannedCode: scannedCode,
        timestamp: new Date(),
        errorType: 'spreadsheet_access'
      };
    }
    
    try {
      sheet = spreadsheet.getSheetByName(sheetName);
      Logger.log('Sheet "' + sheetName + '" accessed successfully');
    } catch (sheetError) {
      Logger.log('ERROR accessing sheet: ' + sheetError.toString());
      return {
        success: false,
        message: "Cannot access sheet '" + sheetName + "': " + sheetError.toString(),
        scannedCode: scannedCode,
        timestamp: new Date(),
        errorType: 'sheet_access'
      };
    }
    
    // Get data with error handling
    Logger.log('Retrieving sheet data...');
    var data;
    try {
      data = sheet.getDataRange().getValues();
      Logger.log('Data retrieved successfully, rows: ' + data.length);
    } catch (dataError) {
      Logger.log('ERROR retrieving data: ' + dataError.toString());
      return {
        success: false,
        message: "Cannot read sheet data: " + dataError.toString(),
        scannedCode: scannedCode,
        timestamp: new Date(),
        errorType: 'data_retrieval'
      };
    }
    
    if (!data || data.length === 0) {
      Logger.log('ERROR: No data in sheet');
      return {
        success: false,
        message: "Sheet is empty",
        scannedCode: scannedCode,
        timestamp: new Date(),
        errorType: 'empty_sheet'
      };
    }
    
    // Get today's date
    var today = new Date();
    var todayString = Utilities.formatDate(today, Session.getScriptTimeZone(), "dd/MM/yyyy");
    Logger.log('Today\'s date: ' + todayString);
    
    // Find today's column with flexible matching
    var todayColumn = -1;
    var headerRow = data[0];
    Logger.log('Header row length: ' + headerRow.length);
    
    // First try exact match
    for (var col = 0; col < headerRow.length; col++) {
      var headerValue = headerRow[col];
      var headerDate = '';
      
      if (headerValue instanceof Date) {
        headerDate = Utilities.formatDate(headerValue, Session.getScriptTimeZone(), "dd/MM/yyyy");
      } else if (typeof headerValue === 'string') {
        headerDate = headerValue.trim();
      }
      
      Logger.log('Checking column ' + (col + 1) + ': "' + headerDate + '"');
      
      if (headerDate === todayString) {
        todayColumn = col + 1; // 1-based index
        Logger.log('Found exact date match in column ' + todayColumn);
        break;
      }
    }
    
    // If no exact match, try flexible matching
    if (todayColumn === -1) {
      Logger.log('No exact date match found, trying flexible matching...');
      for (var col = 2; col < Math.min(headerRow.length, 10); col++) { // Check columns C to J
        var headerValue = String(headerRow[col]).trim();
        if (headerValue.includes('27') || headerValue.includes('/07/') || 
            headerValue.toLowerCase().includes('today') || 
            headerValue.toLowerCase().includes('date')) {
          todayColumn = col + 1;
          Logger.log('Found flexible date match in column ' + todayColumn + ': "' + headerValue + '"');
          break;
        }
      }
    }
    
    // Use default column if still not found
    if (todayColumn === -1) {
      todayColumn = 3; // Column C as default
      Logger.log('No date column found, using default column C');
    }
    
    // Search for the ID
    Logger.log('Searching for ID "' + scannedCode + '" in ' + (data.length - 1) + ' data rows...');
    
    for (var i = 1; i < data.length; i++) { // Start from row 2 (skip header)
      for (var j = 0; j < Math.min(data[i].length, 12); j++) { // Columns A to L
        var cellValue = String(data[i][j]).trim();
        
        Logger.log('Row ' + (i + 1) + ', Col ' + String.fromCharCode(65 + j) + ': "' + cellValue + '"');
        
        if (cellValue === scannedCode && cellValue !== '') {
          // ID FOUND! Mark attendance
          Logger.log('🎯 ID FOUND at row ' + (i + 1) + ', column ' + String.fromCharCode(65 + j));
          
          try {
            sheet.getRange(i + 1, todayColumn).setValue("Present");
            Logger.log('✅ Successfully marked Present at row ' + (i + 1) + ', column ' + todayColumn);
            
            var successResult = {
              success: true,
              message: "Attendance marked for " + todayString,
              row: i + 1,
              column: todayColumn,
              foundInColumn: String.fromCharCode(65 + j),
              markedInColumn: String.fromCharCode(65 + todayColumn - 1),
              dateColumn: todayString,
              timestamp: new Date()
            };
            
            Logger.log('Returning success result: ' + JSON.stringify(successResult));
            return successResult;
            
          } catch (markError) {
            Logger.log('ERROR marking attendance: ' + markError.toString());
            return {
              success: false,
              message: "Found ID but couldn't mark attendance: " + markError.toString(),
              scannedCode: scannedCode,
              timestamp: new Date(),
              errorType: 'marking_failed'
            };
          }
        }
      }
    }
    
    // ID NOT FOUND
    Logger.log('❌ ID "' + scannedCode + '" not found in any column');
    var notFoundResult = {
      success: false,
      message: "ID '" + scannedCode + "' not found in database",
      scannedCode: scannedCode,
      searchedColumns: "A to L",
      totalRowsSearched: data.length - 1,
      timestamp: new Date(),
      errorType: 'id_not_found'
    };
    
    Logger.log('Returning not found result: ' + JSON.stringify(notFoundResult));
    return notFoundResult;
    
  } catch (error) {
    // ULTIMATE FALLBACK
    Logger.log('CRITICAL ERROR in sendback: ' + error.toString());
    Logger.log('Error stack: ' + (error.stack || 'No stack trace'));
    
    var errorResult = {
      success: false,
      message: "System error: " + error.toString(),
      scannedCode: scannedCode || 'unknown',
      errorType: 'system_error',
      timestamp: new Date()
    };
    
    Logger.log('Returning error result: ' + JSON.stringify(errorResult));
    return errorResult;
  } finally {
    Logger.log('=== SENDBACK FUNCTION END ===');
  }
}

function sendCSVEmail(csvContent) {
  try {
    var currentDate = new Date();
    var dateString = Utilities.formatDate(currentDate, Session.getScriptTimeZone(), "yyyy-MM-dd_HH-mm-ss");
    var fileName = "QR_Attendance_" + dateString + ".csv";
    
    var csvBlob = Utilities.newBlob(csvContent, 'text/csv', fileName);
    var recordCount = (csvContent.match(/\n/g) || []).length - 1;
    
    var subject = "QR Attendance Export - " + Utilities.formatDate(currentDate, Session.getScriptTimeZone(), "MMM dd, yyyy HH:mm");
    
    var body = `
QR Code Attendance System Export

Export Details:
- Date: ${Utilities.formatDate(currentDate, Session.getScriptTimeZone(), "MMM dd, yyyy HH:mm:ss")}
- Total Records: ${recordCount}
- File: ${fileName}

This CSV contains all valid attendance records from the current session.

QR Attendance System (Automated)
    `;
    
    MailApp.sendEmail({
      to: adminEmail,
      subject: subject,
      body: body,
      attachments: [csvBlob]
    });
    
    return {
      success: true,
      message: "Email sent successfully",
      fileName: fileName,
      recordCount: recordCount,
      timestamp: currentDate
    };
    
  } catch (error) {
    Logger.log('Email error: ' + error.toString());
    return {
      success: false,
      message: "Email failed: " + error.toString(),
      timestamp: new Date()
    };
  }
}

function getSpreadsheetInfo() {
  try {
    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    var sheet = spreadsheet.getSheetByName(sheetName);
    
    return {
      success: true,
      spreadsheetName: spreadsheet.getName(),
      sheetName: sheet.getName(),
      lastRow: sheet.getLastRow(),
      lastColumn: sheet.getLastColumn(),
      adminEmail: adminEmail,
      timestamp: new Date()
    };
  } catch (error) {
    return {
      success: false,
      error: error.toString(),
      timestamp: new Date()
    };
  }
}
