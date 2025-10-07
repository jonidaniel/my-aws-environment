// Creates two entry forms (upper part of webpage) to Form&Table view

// Create the left side entry form components
const hoursText = document.createElement("p");
const hoursInput = document.createElement("input");
const coursesText = document.createElement("p");
const coursesInput = document.createElement("input");
const outerSearchContainer = document.createElement("div");
const innerSearchContainer = document.createElement("div");
const dropdownContainer = document.createElement("div");
const dropdownList = document.createElement("ul");
const notesText = document.createElement("p");
const notesInput = document.createElement("input");
const submitButton = document.createElement("button");

// Create the right side entry form components
const showByCourseText = document.createElement("p");
const outerSearchContainer2 = document.createElement("div");
const innerSearchContainer2 = document.createElement("div");
const dropdownContainer2 = document.createElement("div");
const dropdownList2 = document.createElement("ul");
const coursesInput2 = document.createElement("input");
const showButton = document.createElement("button");

// Creates both entry forms and shows them on the webpage
function createForm() {
  // Set the hours text
  hoursText.innerText = "How many hours did you study?";
  // Set the hours input field
  hoursInput.value = "e.g. 2.5";
  hoursInput.style.color = "grey";
  hoursInput.addEventListener("focus", () => {
    hoursInput.value = null;
    hoursInput.style.color = "black";
    hoursInput.style.border = null;
  });

  // Set the courses text
  coursesText.innerText = "On what course?";
  // Set the courses input field (left-side)
  coursesInput.type = "text";
  coursesInput.id = "input-value";
  coursesInput.value = "Search...";
  coursesInput.style.color = "grey";
  coursesInput.addEventListener("keyup", () => {
    getSearchItems("");
  });
  coursesInput.addEventListener("focus", () => {
    coursesInput.value = null;
    coursesInput.style.color = "black";
    coursesInput.style.border = null;
  });
  // Set the courses input field 2 (right-side)
  coursesInput2.type = "text";
  coursesInput2.id = "input-value2";
  coursesInput2.value = "Search...";
  coursesInput2.style.color = "grey";
  coursesInput2.addEventListener("keyup", () => {
    getSearchItems("2");
  });
  coursesInput2.addEventListener("focus", () => {
    coursesInput2.value = null;
    coursesInput2.style.color = "black";
    coursesInput2.style.border = null;
  });
  // Set the search container (left-side)
  outerSearchContainer.className = "outer-search-container";
  innerSearchContainer.id = "inner-search-container";
  dropdownContainer.id = "dropdown-container";
  dropdownContainer.addEventListener("click", (event) => {
    let inputField = document.getElementById("input-value");
    inputField.value = event.target.innerText;
    dropdownContainer.innerHTML = "";
  });
  dropdownList.id = "dropdown-list";
  // Set the search container 2 (right-side)
  outerSearchContainer2.className = "outer-search-container2";
  innerSearchContainer2.id = "inner-search-container2";
  dropdownContainer2.id = "dropdown-container2";
  dropdownContainer2.addEventListener("click", (event) => {
    let inputField = document.getElementById("input-value2");
    inputField.value = event.target.innerText;
    dropdownContainer2.innerHTML = "";
  });
  dropdownList2.id = "dropdown-list2";

  // Set the notes text
  notesText.innerText = "Add notes?";
  // Set the notes input field
  notesInput.value = "e.g. Developing the User Interface with...";
  notesInput.style.color = "grey";
  notesInput.addEventListener("focus", () => {
    notesInput.value = null;
    notesInput.style.color = "black";
  });

  // Set the submit button
  submitButton.id = "submit";
  submitButton.innerText = "Submit";
  submitButton.addEventListener("click", () => {
    handleSubmit(hoursInput.value, coursesInput.value, notesInput.value);
  });

  // Set the show by course text
  showByCourseText.innerText = "Show study entries by course:";

  // Set the show button
  showButton.id = "show";
  showButton.innerText = "Show";
  showButton.addEventListener("click", () => {
    handleShow(coursesInput2.value);
  });

  // Build the search container (left-side)
  innerSearchContainer.append(coursesInput);
  dropdownContainer.append(dropdownList);
  outerSearchContainer.append(innerSearchContainer);
  outerSearchContainer.append(dropdownContainer);

  // Build the search container 2 (right-side)
  innerSearchContainer2.append(coursesInput2);
  dropdownContainer2.append(dropdownList2);
  outerSearchContainer2.append(innerSearchContainer2);
  outerSearchContainer2.append(dropdownContainer2);

  // Insert some components to left content div
  contentLeft.append(hoursText);
  contentLeft.append(hoursInput);
  contentLeft.append(coursesText);
  contentLeft.append(outerSearchContainer);
  contentLeft.append(notesText);
  contentLeft.append(notesInput);
  contentLeft.append(submitButton);

  // Insert other components to right content div
  contentRight.append(showByCourseText);
  contentRight.append(outerSearchContainer2);
  contentRight.append(showButton);

  // Go make an entry table (lower part of Form&Table view)
  createTable("create");
}
