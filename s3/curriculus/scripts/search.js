// Contains items for search containers

// Create English search items
const coursesEN = [
  "Understanding Business and the Business Environment",
  "Introduction to Marketing",
  "Management and Leadership",
  "Swedish for Bachelors of Business Administration",
  "Initial Test in Swedish Skills",
  "The ICT Environment and Infrastructure",
  "Fundamentals of Programming",
  "Foundations of Web Development",
  "Information Management and Databases",
  "Data Networks and Information Security",
  "Professional Communication in English",
  "Initial Test in English Skills",
  "Service Design",
  "Corporate Social Responsibility",
  "Digital Marketing and Sales",
  "Data-driven Decision Making",
  "Placement 1",
  "Placement 2",
  "Project Management and Communication",
  "Methods for Research-based Development Work",
  "Thesis",
  "Study Skills and Professional Orientation",
  "Professional Development",
  "Starting a Successful Career",
  "User-centered Design of Digital Services",
  "Modelling a Digital Service",
  "Defining and Designing a Software Product",
  "Introduction to Mobile App Design and Development",
  "Dynamic Web Applications with Javascript",
  "Full Stack Development",
  "Application Development Project",
  "Developing and Maintaining Integrations and API's",
  "Object-oriented Programming",
  "Building and Deploying Cross Platform Mobile Apps",
  "Web Content Management Systems",
  "Programming with C#",
  "Programming with Python",
  "Programming with PHP",
  "Programming with C#",
  "Basics of Programming with C++",
  "Programming with Ruby",
  "Fundamentals of Software Testing",
  "Functional Testing of Software",
  "Usability Testing and Evaluation",
  "Robotic Process Automation",
  "Introduction to Information Security",
  "Introduction to Linux Operating System",
  "Audiovisual Production",
  "Planning and Implementation of Media Elements",
  "Fundamentals of Subscription Economy",
  "DevOps Fundamentals",
  "AWS Cloud Fundamentals",
];

// Create Finnish search items
let coursesFI = [
  "Liiketoimintaosaaminen",
  "Markkinoinnin perusteet",
  "Johtaminen ja johtajuus",
  "Svenska för tradenomer",
  "Ruotsin kielen osaamisen lähtötasotesti",
  "ICT-toimintaympäristö",
  "Ohjelmoinnin perustaito",
  "Verkkosivujen kehittäminen",
  "Tiedonhallinta ja tietokannat",
  "Tietoverkot ja tietoturva",
  "Professional Communication in English",
  "Englannin kielen osaamisen lähtötasotesti",
  "Service Design",
  "Corporate Social Responsibility",
  "Digital Marketing and Sales",
  "Data-driven Decision Making",
  "Harjoittelu 1",
  "Harjoittelu 2",
  "Projektinhallinta ja viestintä",
  "Tutkimuksellisen kehittämistyön menetelmät",
  "Opinnäytetyö",
  "Opiskelutaidot ja ammatillinen kehittyminen",
  "Ammatillinen kehittyminen",
  "Onnistuneelle työuralle",
  "Digitaalisten palvelujen käyttäjäkeskeinen suunnittelu",
  "Digitaalisen palvelun mallinnus",
  "Ohjelmistotuotteen määrittely ja suunnittelu",
  "Introduction to Mobile App Design and Development",
  "Web-sovellusten kehittäminen Javascriptillä",
  "Full Stack -sovelluskehitys",
  "Sovelluskehitysprojekti",
  "Integraatioiden ja API-ratkaisujen kehittäminen ja ylläpito",
  "Olio-ohjelmointi",
  "Building and Deploying Cross Platform Mobile Apps",
  "Web Content Management Systems",
  "C# -ohjelmointi",
  "Python-ohjelmointi",
  "PHP-ohjelmointi",
  "C-ohjelmointi",
  "Ohjelmoinnin perusteet C++ -kielellä",
  "Ruby-ohjelmointi",
  "Ohjelmistotestauksen perusteet",
  "Ohjelmistojen toiminnallinen testaus",
  "Käytettävyyden arviointi ja testaus",
  "Ohjelmistorobotiikka (RPA)",
  "Introduction to Information Security",
  "Johdatus Linux-käyttöjärjestelmään",
  "Ääni- ja videotuotanto",
  "Mediaelementtien suunnittelu ja toteutus",
  "Fundamentals of Subscription Economy",
  "DevOps Fundamentals",
  "AWS-pilven perusteet",
];

function getSearchItems(placeholder) {
  // Get courses input value
  let inputValue = document.getElementById(`input-value${placeholder}`).value;
  inputValue = inputValue.trim().toLowerCase();

  // Get courses list (ul element)
  let list = document.getElementById(`dropdown-container${placeholder}`);
  list.innerHTML = "";

  // If something is searched
  if (inputValue.length > 0) {
    // Iterate through all Laurea courses
    for (let item in coursesEN) {
      // If index is larger than -1
      if (coursesEN[item].toLowerCase().indexOf(inputValue) > -1) {
        let bold = coursesEN[item];

        // Search for character matches from all courses,
        // and then highlight the matching characters (by bolding)
        const matches = bold.match(new RegExp(inputValue, "i"));
        bold = bold.replace(matches[0], `<strong>${matches[0]}</strong>`);

        // Create list item (li element),
        // set it as the bolded item
        // and append it to list
        let crtElmt = document.createElement("li");
        crtElmt.innerHTML = bold;
        list.appendChild(crtElmt);
      }
    }
    // If nothing is searched
  } else {
    list.innerHTML = "";
  }
}
