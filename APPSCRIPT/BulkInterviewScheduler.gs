function scheduleCalenderInterview() {
  var sheet = SpreadsheetApp.openById('<Sheet-ID>').getSheetByName('Sheet-Name'); 
  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();

  //Assume data is in format of :- Name	| Email Id | Contact No |	Post	| Interview Time/Date |
  
  // Loop through each row of data (excluding header)
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var applicantName = row[0];
    Logger.log(applicantName)   //Logs application name can be ignored
    var applicantEmail = row[1];
    var dateTime = new Date(row[4]); 
    
    // Split the combined date and time into separate variables
    var dateString = dateTime.toString();
    var dateSplit = dateString.split(" ");
    var date = dateSplit.slice(0, 4).join(" ");
    var time = dateSplit[4].substring(0, 5);
    
    // Construct the interview invitation message
    var message = "Dear " + applicantName + ",\n\n" +
      "<Your Message>" +
      "Date: " + date + "\n" +
      "Time: " + time + "\n";
    
    message += "\nPlease make sure to be available at the scheduled time and come prepared for the interview.\n\n" +
      "If you have any specific requirements or need any additional information, please let us know in advance.\n\n" +
      "We look forward to connecting with you on " + date + ".\n\n" +
      "Best regards,\n" +
      "<Your Name>\n" +
      "<Your postion>,\n" +
      "<Company/Organisation Name>";
    
    
    // Schedule the interview in the interviewee's Google Calendar
    var intervieweeCalendar = CalendarApp.getDefaultCalendar();
    Logger.log(intervieweeCalendar)
    var eventTitle = "<Company> Interview - "+ applicantName;
    var eventInterviewee = intervieweeCalendar.createEvent(eventTitle, dateTime, dateTime, { location: "Online", description:message, guests: "interviewer1@example.com, interviewer2@example.com, interviewer3@example.com" });

    // Add the interviewee as a guest to the event
    eventInterviewee.addGuest(applicantEmail);

    // Send the interview invitation email
    MailApp.sendEmail(applicantEmail, "<subject>", message,{name: "<Your Name alias>"});
    Logger.log("Interview scheduled for " + applicantName + " on " + date + " at " + time);
  }
}


// Original Script by Pranav Mehendale

