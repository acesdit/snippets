const SHEETID = '<Sheet id>';
const DOCID = '<Doc id>';
const FOLDERID = '<folder id>';//This folder stores all the tickets genrated

function sender() {
  const sheet = SpreadsheetApp.openById(SHEETID).getSheetByName('data');//Make sure sheet name is 'data'
  const data = sheet.getDataRange().getValues();

  const temp = DriveApp.getFileById(DOCID);
  const folder = DriveApp.getFolderById(FOLDERID);

  const rows = data.slice(1);  // Skipping header row

  rows.forEach((row, index) => {
    if (row[4] === '') {  // Check if SENT column is empty
      const file = temp.makeCopy(folder);
      const doc = DocumentApp.openById(file.getId());
      const body = doc.getBody();

      // Replacing placeholders in the template
      data[0].forEach((heading, i) => {
        const header1 = heading.toUpperCase();
        body.replaceText(`{${header1}}`, row[i]);
      });

      // Generate QR Code using ID (Column A)
      const id = row[0];  // ID is in the first column
      const qrCodeUrl = generateQrCode(id);
      Logger.log(`QR Code URL: ${qrCodeUrl}`);  // Log the QR code URL

      try {
        const qrBlob = UrlFetchApp.fetch(qrCodeUrl, { muteHttpExceptions: true }).getBlob().setName('qrCode.png');
        
        // Inserting QR Code into the first column (orange box area)
        const tables = body.getTables();
        if (tables.length > 0) {
          const table = tables[0];  // Assuming the first table is the one we want
          const qrCell = table.getCell(0, 0);  // Accessing the first column of the first row (orange box area)
          qrCell.clear();  // Clear any existing content (orange box)
          qrCell.appendImage(qrBlob);  // Insert QR Code image
        } else {
          Logger.log('No tables found in the document.');
        }
      } catch (e) {
        Logger.log(`Failed to fetch QR code: ${e.message}`);
      }

      // Save document and send email
      const docName = `${row[1]} ${row[2]}`;  // NAME and LAST for the document name
      doc.setName(docName);
      const blob = doc.getAs(MimeType.PDF);
      doc.saveAndClose();
      const pdf = folder.createFile(blob).setName(docName + '.pdf');
      const email = row[3];  // Email is in the fourth column
      const subject = `${docName} - Ticket Created`;
      const messageBody = `Hi ${row[1]},\nHere is your ticket for the HackSeries session in PDF format. Please find the attached file.`;

      // Adding try-catch block for sending email
      try {
        MailApp.sendEmail({
          to: email,
          subject: subject,
          name: "-------",
          htmlBody: messageBody,
          attachments: [pdf]
        });
        Logger.log(`Email sent successfully to: ${email}`);
      } catch (error) {
        Logger.log(`Failed to send email to: ${email}, Error: ${error.message}`);
      }

      // Update the SENT column with the current date
      sheet.getRange(index + 2, 5).setValue(new Date());
      file.setTrashed(true);  // Trash the copied document after creating the PDF
    }
  });
}

// Function to generate QR Code URL using goqr.me API
function generateQrCode(text) {
  const qrCodeSize = 150;
  const encodedText = encodeURIComponent(text);
  return `https://api.qrserver.com/v1/create-qr-code/?size=${qrCodeSize}x${qrCodeSize}&data=${encodedText}`;
}