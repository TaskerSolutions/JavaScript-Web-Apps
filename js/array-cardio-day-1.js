const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
  { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
  { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
  { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
  { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
  { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
  { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
  { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
  { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];

const output = document.getElementById("output");

// display initial array in html
window.onload = outputInventors;



var userInputFilterMin = document.getElementById("user-input-filter-min");
var userInputFilterMax = document.getElementById("user-input-filter-max");
var userInputMap = document.getElementById("user-input-map");
var userInputSort = document.getElementById("user-input-sort");
$(userInputFilterMin).on('input propertychange paste', outputInventors);
$(userInputFilterMax).on('input propertychange paste', outputInventors);
$(userInputMap).on('input propertychange paste', outputInventors);
$(userInputSort).on('input propertychange paste', outputInventors);

function outputInventors () { 
  // --------------------------- ARRAY FILTER ----------------------------------
  // collect values if present
  if(!userInputFilterMin.value) {
    var min = 1400;
  } else {
    min = userInputFilterMin.value
  }
  if(!userInputFilterMax.value) {
    var max = 2100;
  } else {
    max = userInputFilterMax.value
  }
  // filter array (each result returns a boolean)
  var filteredInventors = inventors.filter(
    inventor => (inventor.year >= min && inventor.passed <= max)
  );

  // ------------------------------- Array SORT --------------------------------
  // Sort the inventors by birthdate, oldest to youngest
  var sortedInventors = filteredInventors.sort((a, b) => {
    if(userInputSort.value == "first") {
      // if (a.first > b.first) {return 1} else {return -1}
      return a.first > b.first ? 1 : -1
    } else if(userInputSort.value == "last") {
      return a.last > b.last ? 1 : -1
    } else if(userInputSort.value == "year") {
      return a.year > b.year ? 1 : -1
    } else if(userInputSort.value == "passed") {
      return a.passed > b.passed ? 1 : -1
    } else if(userInputSort.value == "age") {
      return (a.passed - a.year) > (b.passed - b.year) ? 1 : -1
    }
  });

  // ------------------------------- Array REDUCE ------------------------------
  const totalYears = sortedInventors.reduce((total, inventor) => {
    return total + (inventor.passed - inventor.year);
  }, 0);

  const century = sortedInventors.reduce((obj, inventor) => {
    if(inventor.year >= 1500 && inventor.year < 1600) {
      obj[1500]++;
    } else if (inventor.year >= 1600 && inventor.year < 1700) {
      obj[1600]++;
    } else if (inventor.year >= 1700 && inventor.year < 1800) {
      obj[1700]++;
    } else if (inventor.year >= 1800 && inventor.year < 1900) {
      obj[1800]++;
    }
    return obj;
  }, {
    1500: 0,
    1600: 0,
    1700: 0,
    1800: 0
  });

  // var str = JSON.stringify(century);
  // print to html
  document.getElementById("total-output").innerHTML = 
    "Total age of all present: " + totalYears +
    "<br>Number born in 1500s: " + century[1500] + 
    "<br>Number born in 1600s: " + century[1600] + 
    "<br>Number born in 1700s: " + century[1700] + 
    "<br>Number born in 1800s: " + century[1800];



  // ------------------------------- ARRAY MAP ---------------------------------
  // map always returns same amount of items as it is given
  // result is returned as an array of strings rather than an array of objects
  if (userInputMap.value == "everything") {
    var mappedInventors = sortedInventors.map( inventor => ('<br>' + inventor.first + ' ' + inventor.last + ', ' + inventor.year + ' - ' + inventor.passed) );
  } else if (userInputMap.value == "first-name") {
    var mappedInventors = sortedInventors.map( inventor => ('<br>' + inventor.first) );
  } else if (userInputMap.value == "last-name") {
    var mappedInventors = sortedInventors.map( inventor => ('<br>' + inventor.last) );
  } else if (userInputMap.value == "full-name") {
    var mappedInventors = sortedInventors.map( inventor => ('<br>' + inventor.first + ' ' + inventor.last) );
  } else if (userInputMap.value == "born-passed") {
    var mappedInventors = sortedInventors.map( inventor => ('<br>' + inventor.year + ' - ' + inventor.passed) );
  }
  // display results
  output.innerHTML = mappedInventors;
}