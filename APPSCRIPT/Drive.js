
// function gives the names and ids of 10 files present in drive

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
