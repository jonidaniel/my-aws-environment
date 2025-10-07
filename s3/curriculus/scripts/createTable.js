// Creates an entry table (lower part of webpage) to Form&Table view
// User can manipulate the table by pressing the Submit or Show buttons

// Creates a 4-column entry table containing previously submitted entries
// Table cells contain entry date and time, affiliated course, study amount, and possible notes
function createTable(arg) {
  // Get previous entries
  getEntries().then((result) => {
    // All previous entries in an array
    const previousEntries = result.Items;

    let entries = [];
    let showableEntries = [];

    // If you're coming from Go or Submit button click
    if (arg == "create") {
      entries = previousEntries;
      // If you're coming from Show button click
    } else {
      // Gather all matching entries in an array
      for (let i = 0; i < previousEntries.length; i++) {
        if (previousEntries[i].course === arg) {
          showableEntries.push(previousEntries[i]);
        }
      }
      entries = showableEntries;
    }

    // Sort entries array
    entries.sort((a, b) => {
      if (a.datetime > b.datetime) {
        return -1;
      } else if (a.datetime < b.datetime) {
        return 1;
      }
      return 0;
    });

    // Remove old entry table and create a new one
    if (document.querySelector("table")) myTable.remove();
    myTable = document.createElement("table");
    myTable.id = "table";

    // Create table description
    if (entries == showableEntries) {
      myTable.insertRow().innerText = "Showing entries by course";
    } else {
      myTable.insertRow().innerText = "Showing all entries";
    }

    // Create table header row
    const row = myTable.insertRow();
    const firstColumnHeader = row.insertCell();
    const secondColumnHeader = row.insertCell();
    const thirdColumnHeader = row.insertCell();
    const fourthColumnHeader = row.insertCell();

    // Set the table headers
    firstColumnHeader.className = "table-header";
    firstColumnHeader.innerText = "Date & Time";
    secondColumnHeader.className = "table-header";
    secondColumnHeader.innerText = "Course";
    thirdColumnHeader.className = "table-header";
    thirdColumnHeader.innerText = "Study Amount";
    fourthColumnHeader.className = "table-header";
    fourthColumnHeader.innerText = "Notes";

    // Create rest of the table one row at a time from top to bottom
    if (entries != null) {
      for (let i = 0; i < entries.length; i++) {
        // Create row
        const row = myTable.insertRow();
        const firstCell = row.insertCell();
        const secondCell = row.insertCell();
        const thirdCell = row.insertCell();
        const fourthCell = row.insertCell();

        // Set dates in the first table column
        firstCell.className = "cell";
        firstCell.innerText = entries[i].datetime;

        // Set courses in the second table column
        secondCell.className = "cell";
        secondCell.innerText = entries[i].course;

        // Set study amounts in the third table column
        thirdCell.className = "cell";
        thirdCell.innerText = entries[i].studyAmount + " hours";

        // Set notes in the fourth table column
        fourthCell.className = "cell";
        if (entries[i].notes != null && entries[i].notes != undefined)
          fourthCell.innerText = entries[i].notes;
      }
    }
    // Insert the table to content parent div
    content.append(myTable);
  });
}
