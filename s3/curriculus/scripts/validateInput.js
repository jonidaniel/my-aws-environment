// Validates study hours input
// Restricts input to only numbers
function validateHours(value) {
  if (!isNaN(value) && value !== "") {
    return true;
  } else {
    document.querySelectorAll("input")[0].style.border = "2px solid red";
    return false;
  }
}

// Validates courses input (left-side input field)
// Checks that a course is selected or wrote down
function validateCourses(value) {
  if (value != "Search..." && value != "") {
    return true;
  } else {
    document.querySelectorAll("input")[1].style.border = "2px solid red";
    return false;
  }
}

// Validates courses 2 input (right-side input field)
// Checks that a course is selected or wrote down
function validateCourses2(value) {
  if (value != "Search..." && value != "") {
    return true;
  } else {
    document.querySelectorAll("input")[3].style.border = "2px solid red";
    return false;
  }
}
