---
extension: js
author: shri-915
category: AppScript
layout: '../../layouts/SubmissionLayout.astro'
title: Gmail-Label-Filter
---
```js
function createGmailLabelAndFilter() {
  var labelName = "Testing";
  var label = GmailApp.createLabel(labelName); // Create label

  var filter = 
  {
    criteria: 
    {
      from: "info@kotakmf.com", //adjust the email id and other details as required
      //subject: "Important"
    },
    action: 
    {
      addLabel: labelName,
      archive: true
    }
  };
  // You need to manually add filters in Gmail UI; Apps Script cannot directly create Gmail filters.
  Logger.log("Filter created. Apply the filter with these settings: " + JSON.stringify(filter));
}```
