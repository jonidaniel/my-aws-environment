// Handles Go button clicks
function handleGo() {
  // Remove the intro text and Go button,
  // since the page is about to change
  introText.remove();
  goButton.remove();
  // Go make two forms (upper part of Form&Table view)
  createForm();
}

// Handles Submit button clicks
function handleSubmit(hours, course, notes) {
  // Replace possible hours input comma with a dot
  hours = hours.replace(",", ".");

  // Validate hours input and courses input in respective functions
  // No need to validate notes input
  const hoursValidated = validateHours(hours);
  const coursesValidated = validateCourses(course);

  if (hoursValidated && coursesValidated) {
    // Reset all input fields
    hoursInput.value = "e.g. 2.5";
    coursesInput.value = "Search...";
    notesInput.value = "e.g. Developing the User Interface with...";
    hoursInput.style.color = "grey";
    coursesInput.style.color = "grey";
    notesInput.style.color = "grey";
    // Erase possible default notes value
    if (notes == "e.g. Developing the User Interface with...") notes = "";

    // Get previous entries
    let result = getEntries();
    // If there are no previous entries
    if (result.Items == null) {
      let json = JSON.stringify([{ hours, course, notes }]);
      // Post entry to database
      postEntry(json).then(() => {
        // Go update the entry table
        createTable("create");
      });
      // If there are previous entries
    } else {
      result.Items.push({ hours, course, notes });
      let json = JSON.stringify(result.Items);
      // Post entry to database
      postEntry(json).then(() => {
        // Go update the entry table
        createTable("create");
      });
    }
  }
}

// Handles Show button clicks
function handleShow(course) {
  if (validateCourses2(coursesInput2.value)) {
    // Reset course field
    coursesInput2.value = "Search...";
    coursesInput2.style.color = "grey";
    // Go update the entry table
    // 'course' tells createTable that this time we're showing records,
    // not submitting them
    createTable(course);
  }
}
