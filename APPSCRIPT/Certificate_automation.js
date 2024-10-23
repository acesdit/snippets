const SHEETID = '1P61uSqh0-YptXAAVGKb7fewsqSwhDvNrrer4eOIytaw';//add sheet id 
const SLIDEID = '1id5p26QZIWYY9H_L2gvUidgZQewZHWvSs90nt-ktvws';//add slide id 
const FOLDERID = '17-NmT8BlnE-aOArAkx8Y9o4N7DDOjKtO';//add folder id 

//Function for Ui
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Email Out')
    .addItem('Send Emails', 'sender')
    .addToUi();
}

function sender() {
  const sheet = SpreadsheetApp.openById(SHEETID).getSheetByName('data');
  const data = sheet.getDataRange().getValues();
  const templateFile = DriveApp.getFileById(SLIDEID);
  const folder = DriveApp.getFolderById(FOLDERID);

  const rows = data.slice(1);  // Remove header row
  rows.forEach((row, index) => {
    Logger.log('Processing row: ' + JSON.stringify(row)); // Log the row being processed

   
    const file = templateFile.makeCopy(folder);
    Logger.log('File created: ' + file.getId());

    const doc = SlidesApp.openById(file.getId());
    const slides = doc.getSlides();

    slides.forEach((slide) => {
      const slideShapes = slide.getShapes();
      slideShapes.forEach((shape) => {
        const textRange = shape.getText();
        if (textRange) {
          data[0].forEach((heading, i) => {
            const header1 = heading.toUpperCase();
            textRange.replaceAllText(`{${header1}}`, row[i]);
          });
        }
      });
    });

    doc.setName(row[0] + row[1]);
    doc.saveAndClose(); // Save and close the document before converting to PDF

    // Create a PDF from the file
    const pdfBlob = file.getAs(MimeType.PDF);
    const pdfFile = folder.createFile(pdfBlob).setName(row[0] + row[1] + '.pdf');

    const email = row[3];
    Logger.log('Email to be sent: ' + email); // Log email to be sent
    const subject = `ACES HACKSERIES00`;
    const messageBody = `Hi ${row[1]},<br>Thank you for participating!`;

    Logger.log('Sending email with subject: ' + subject); // Log email subject
    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: messageBody,
      attachments: [pdfBlob] // Attach the PDF blob
    });

    const tempo = sheet.getRange(index + 2, 5, 1, 1);
    tempo.setValue(new Date());
    file.setTrashed(true);
  });
}
