---
extension: js
author: shri-915
category: AppScript
layout: '../../layouts/SubmissionLayout.astro'
title: Slack-Notification-Bot
---
```js
//Create a Slack App:
//  Go to the Slack API App page and create a new app.
//  Under Features, enable Incoming Webhooks.
//  Add a new webhook to a channel and copy the webhook URL.
//Create a Google Sheet:
//  Set up a sheet with columns for Task, Due Date, Status, or any other criteria you need to track.
//Implement the Google Apps Script:
//  Open Google Sheets > Extensions > Apps Script and add the code below.
//  Replace the Slack Webhook URL with the one you generated in Step 1.

// Step 1: Set your Slack Webhook URL here
var SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL';

// Step 2: Function to check criteria and send notifications
function sendSlackNotifications() 
{
  var sheet = SpreadsheetApp.openById('1A3Rs7WIQ61K207_7r2n3tAF175-h4ju9Um1m9qm3Mt8').getSheetByName("Slack-Bot"); 
  // Adjust sheet id and name wrt your Google Sheet
  var data = sheet.getDataRange().getValues(); 
  // Retrieve all data from sheet
  
  // Iterate through each row in the sheet, starting from row 2 (assuming row 1 is headers)
  for (let i = 1; i < data.length; i++) 
  {
    var task = data[i][0];
    // Task Name in Coloumn A
    var dueDate = new Date(data[i][1]); 
    // Due Date in column B
    var status = data[i][2];
    // Status in Column C
    
    // Example Criteria: Notify if task is due today and status is not complete
    var today = new Date();
    var isDueToday = today.toDateString() === dueDate.toDateString();
    var isIncomplete = status !== 'Complete';
    if (isDueToday && isIncomplete) 
    {
      // Send a Slack notification
      var message = `🔔 Reminder: *${task}* is due today and is still incomplete!`;
      postToSlack(message);
      //Update status or log in the sheet if needed
      sheet.getRange(i + 1, 4).setValue("Notified"); 
      //Optional: mark as notified in column D
    }
  }
}

// Step 3: Function to post message to Slack
function postToSlack(message) 
{
  var payload = JSON.stringify({ text: message });
  
  var options = 
  {
    method: 'POST',
    contentType: 'application/json',
    payload: payload
  };
  
  try {
    UrlFetchApp.fetch(SLACK_WEBHOOK_URL, options);
    Logger.log("Message sent to Slack: " + message);
  } catch (e) 
  {
    Logger.log("Failed to send message to Slack: " + e.message);
  }
}```
