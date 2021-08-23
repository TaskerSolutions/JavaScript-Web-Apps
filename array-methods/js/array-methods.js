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
  { first: 'Hanban', last: 'Hammar', year: 1829, passed: 1909 },
  { first: 'Isaacyy', last: 'Newtonyy', year: 1443, passed: 1527 },
  { first: 'Galileooo', last: 'Galileioo', year: 1568, passed: 1648 },
  { first: 'Marieee', last: 'Curieee', year: 1857, passed: 1937 },
  { first: 'Johannesss', last: 'Keplerrr', year: 1551, passed: 1640 },
  { first: 'Nicolausss', last: 'Copernicusss', year: 1493, passed: 1583 },
  { first: 'Maxed', last: 'Plancked', year: 1818, passed: 1917 },
  { first: 'Katherineo', last: 'Blodgetto', year: 1888, passed: 1929 },
  { first: 'ADA', last: 'Lovelacey', year: 1805, passed: 1822 },
  { first: 'Sarah B.', last: 'Good', year: 1835, passed: 1901 },
  { first: 'Lis', last: 'Meit', year: 1868, passed: 1928 },
  { first: 'Hanna', last: 'Hammarström', year: 1869, passed: 1949 }
];

// display initial array in html
window.onload = outputInventors;

const output = document.getElementById("output");
const userInputFilterMin = document.getElementById("user-input-filter-min");
const userInputFilterMax = document.getElementById("user-input-filter-max");
const userInputMap = document.getElementById("user-input-map");
const userInputSort = document.getElementById("user-input-sort");
const userInputFind = document.getElementById("user-input-find");

$(userInputFilterMin).on('input propertychange paste', outputInventors);
$(userInputFilterMax).on('input propertychange paste', outputInventors);
$(userInputMap).on('input propertychange paste', outputInventors);
$(userInputSort).on('input propertychange paste', outputInventors);
$(userInputFind).on('input propertychange paste', outputInventors);

var sortedInventors, filteredInventors;

function outputInventors () { 
  filter();
  sort(filteredInventors);
  reduce(sortedInventors);
  some(sortedInventors);
  every(sortedInventors);
  find(sortedInventors);
  findIndex(sortedInventors);
  map(sortedInventors);  
}


// --------------------------- ARRAY FILTER ----------------------------------
function filter() {
  // filter array (each result returns a boolean)
  filteredInventors = inventors.filter(
    inventor => (inventor.year >= userInputFilterMin.value)
  );
}



// ------------------------------- Array SORT --------------------------------
function sort(filteredInventors) {
  // Sort the inventors by birthdate, oldest to youngest
  sortedInventors = filteredInventors.sort((a, b) => {
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
}


  // ------------------------------- Array REDUCE ------------------------------
function reduce(sortedInventors) {
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
  document.getElementById("reduce-output").innerHTML = 
    "Total age of all present: " + totalYears +
    "<br>Number born in 1800s: " + century[1800];
}




// ------------------------------- ARRAY SOME --------------------------------
function some(sortedInventors) {
  /* long way of writing
  const isOld = sortedInventors.some(function(sortedInventors) {
    const currentYear = (new Date()).getFullYear();
    if (currentYear - sortedInventors.year >= 300) {
      return true;
    }
  });
  // shorter way of writing
  const isOld = sortedInventors.some(inventor => {
    const currentYear = (new Date()).getFullYear();
    return currentYear - inventor.year >= 300;
  });*/
  // shortest way of writing (implicit return)
  const isOld = sortedInventors.some(inventor => (new Date()).getFullYear() - inventor.year >= 300);

  document.getElementById("some-output")
  .innerHTML = "Was at least one Inventor born over 300 years ago?<br><strong>" + isOld + "</strong>";
}

// ------------------------------- ARRAY EVERY -------------------------------
function every(sortedInventors) {
  const isGroupOld = sortedInventors.every(inventor => (new Date()).getFullYear() - inventor.year >= 300);

  document.getElementById("every-output")
  .innerHTML = "Was every Inventor born over 300 years ago?<br><strong>" + isGroupOld + "</strong>";
}




 // ------------------------------- ARRAY FIND --------------------------------
function find(sortedInventors) {

  const foundInventor = sortedInventors.find(inventor => 
    inventor.first.toUpperCase() === userInputFind.value.toUpperCase() ||
    inventor.last.toUpperCase() === userInputFind.value.toUpperCase()
  );

  // turn object into array so it can be printed to html
  if (foundInventor) {
    var foundOutput = Object.values(foundInventor)
  } else {
    foundOutput = "Not found"
  }
  // print array to html
  document.getElementById("find-output").innerHTML = foundOutput;
}




 // --------------------------- ARRAY FIND INDEX -------------------------------
function findIndex(sortedInventors) {

  var foundInventorIndex = sortedInventors.findIndex(inventor => 
    inventor.first.toUpperCase() === userInputFind.value.toUpperCase() ||
    inventor.last.toUpperCase() === userInputFind.value.toUpperCase()
  );

  if (foundInventorIndex < 0) {
    foundInventorIndex = "Not found"
  }
  // print array to html
  document.getElementById("find-index-output").innerHTML = "Index in array = " + foundInventorIndex;
}





// ------------------------------- ARRAY MAP ---------------------------------
function map(sortedInventors) {
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


var newInventors;

// ------------------------- DELETE FROM ARRAY --------------------------------
document.getElementById("delete-index").addEventListener("click", deleteIndex);

function deleteIndex() {
  const inventorToDelete = inventors.findIndex(inventor => 
    inventor.first.toUpperCase() === userInputFind.value.toUpperCase() ||
    inventor.last.toUpperCase() === userInputFind.value.toUpperCase()
  );

  if (inventorToDelete >= 0) {  
    inventors.splice(inventorToDelete, 1);
    outputInventors();
  }

  // Redux way to delete (better in most circumstances)
  newInventors = [
    ...inventors.slice(0, inventorToDelete),
    ...inventors.slice(inventorToDelete +1)
  ];
}