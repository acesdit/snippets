function getGoogleFormResponses() {
  var Sheet_Id = "";
  var form = FormApp.openById(Sheet_Id);
  
  var docs_arr = [];
var formResponses = form.getResponses();
for (var i = 0; i < formResponses.length; i++) {
  var formResponse = formResponses[i];
  var doc = DocumentApp.create(`New Document_${i}`);
  var docBody = doc.getBody();
  var itemResponses = formResponse.getItemResponses();
  for (var j = 0; j < itemResponses.length; j++) {
    var itemResponse = itemResponses[j];
    docBody.appendParagraph(itemResponse.getItem().getTitle()+"\n"+itemResponse.getResponse().toString()+"\n\n");
 
  }
  docs_arr.push(doc.getId());
}
return docs_arr;
}
