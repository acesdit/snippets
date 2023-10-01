---
extension: js
author: yashjawale
category: AppScript
layout: '../../layouts/SubmissionLayout.astro'
title: Sorting Bookmarks in a document
---
```js
function testBookMarkData() {
  // delete all current bookmarks
  DocumentApp.getActiveDocument().getBookmarks().forEach(function (b) {
    b.remove();
  });

  // add some test ones
  insertSomeBookMarks("google");
  insertSomeBookMarks("script");
  insertSomeBookMarks("apps");

  // show order before
  var bookMarks = DocumentApp.getActiveDocument().getBookmarks();
  bookMarks.forEach(function (b) {
    Logger.log(b.getId() + ':' + b.getPosition().getElement().asText().getText());
  });

  // show order after
  var sortedBookMarks = sortBookMarks();
  sortedBookMarks.forEach(function (b) {
    Logger.log(b.getId() + ':' + b.getPosition().getElement().asText().getText());
  });
}

function insertSomeBookMarks(searchItem) {
  // insert bookmarks for all the searchitems
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();

  var rangeElement = body.findText(searchItem);
  while (rangeElement !== null) {
    var position = doc.newPosition(rangeElement.getElement(), rangeElement.getStartOffset());
    var bookMark = position.insertBookmark();
    rangeElement = body.findText(searchItem, rangeElement);
  }
}
```
