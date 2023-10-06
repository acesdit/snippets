
/*
function lists the names and ids of 5 files present in drive,
we can list as many files name,id present in drive by default it is taken 5 
*/

function ListFiles() {
    try {

    // Files.list returns the list of files present in drive.

    const files = Drive.Files.list({
      fields: "nextPageToken, items(id, title)",
      maxResults: 5,
    }).items;

    // Printing the title and id of files available in drive.
    for (const file of files) {
      console.log("%s (%s)", file.title, file.id);
    }
  } catch (err) {
    console.log("failed with error %s", err.message);
  }
}
