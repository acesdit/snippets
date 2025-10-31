function sendVerifiedPaymentEmails() {
  const sheetId = 'YOUR SHEET ID'; // Replace with your actual Sheet ID
  const sheet = SpreadsheetApp.openById(sheetId).getSheetByName('Verified'); // Replace with your subsheet name
  const data = sheet.getDataRange().getValues();
  const adminEmail = 'YOUR MAIL ID'; // Replace with the actual admin email
  const subject = 'SUBJECT THAT YOU WANT TO SEND'; // Replace with your subject line
  let report = [];

  // Ensure "Reminder Status" column exists in Column V (index 21)
  if (data[0].length < 22) {
    sheet.insertColumnAfter(21);
    sheet.getRange(1, 22).setValue("Reminder Status");
  }

  for (let i = 1; i < data.length; i++) {
    try {
      let name = data[i][2]; // Column C (index 2)
      let email = data[i][1]; // Column B (index 1)
      let paymentVerified = data[i][17]; // Column R (index 17)
      let duoCheck = data[i][9]; // Column J (index 9)
      let reminderStatus = data[i][21]; // Column V (index 21)

      if (!email || !name || paymentVerified !== true || duoCheck !== 'Duo') {
        sheet.getRange(i + 1, 22, 1, 1).setValue('Skipped');
        report.push([email || 'N/A', name || 'N/A', 'Skipped: Missing Data or Unverified Payment']);
        continue;
      }

      if (reminderStatus === 'Sent') {
        report.push([email, name, 'Already Sent']);
        continue;
      }

      let htmlBody = HtmlService.createHtmlOutputFromFile('reminderteam').getContent();
      htmlBody = htmlBody.replace('{name}', name);

      MailApp.sendEmail({
        to: email,
        subject: subject,
        htmlBody: htmlBody
      });

      sheet.getRange(i + 1, 22, 1, 1).setValue('Sent');
      report.push([email, name, 'Success']);
    } catch (error) {
      sheet.getRange(i + 1, 22, 1, 1).setValue('Failed');
      report.push([data[i][1] || 'N/A', data[i][2] || 'N/A', `Failed: ${error.message}`]);
    }
  }

  sendReportToAdmin(adminEmail, report);
}

function sendReportToAdmin(adminEmail, report) {
  let htmlReport = '<h3>Email Sending Report</h3><table border="1"><tr><th>Email</th><th>Name</th><th>Status</th></tr>';
  report.forEach(row => {
    htmlReport += `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td></tr>`;
  });
  htmlReport += '</table>';

  MailApp.sendEmail({
    to: adminEmail,
    subject: 'YOUR SUBJECT LINE', // Replace with your subject line
    body: 'Please find the email sending report attached.',
    // Use the HTML body for better formatting
    // Note: Gmail may not render HTML in the body, so use htmlBody instead
    htmlBody: htmlReport
  });
}
