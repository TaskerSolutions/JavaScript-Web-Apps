const bands = [
  'The Plot in You',
  'The Devil Wears Prada',
  'Pierce the Veil',
  'Norma Jean',
  'The Bled',
  'Say Anything',
  'The Midway State',
  'We Came as Romans',
  'Counterparts',
  'Oh, Sleeper',
  'A Skylit Drive',
  'Anywhere But Here',
  'An Old Dog'
];
const output = document.querySelector('#bands');
const sortBtn =  document.querySelector('#sort-btn');
const sortWithoutArticlesBtn =  document.querySelector('#sort-without-articles-btn');
let strippedBands = [];

// populate html
bands.forEach(band => output.innerHTML += '<li>' + band + '</li>');


// replace a part of the band name
function strip(bandName) {
  // use a regular expression to replace all articles in one go
  // ^(a |the |an ) = 'starts with 'a ' or 'the ' or 'an ' 
  // having a space after 'an ' will prevent it from catching a word like 'anywhere'
  // i = case insensitive
  // .trim() removes any spaces that may be after it
  return bandName.replace(/^(a |the |an )/i).trim();
}


function sortList() {
  const sortedBands = bands.sort( (a, b) => a > b ? 1 : -1 );
  // output.innerHTML = "";
  // sortedBands.forEach(band => output.innerHTML += '<li>' + band + '</li>');
  
  // better way... 
  // .map() each element of 'sortedBands'
  // .join('') the resulting array to a string so that is can be printed to html
  output.innerHTML = sortedBands.map( band => `<li>${band}</li>`).join('');
}

function sortListWithoutArticles() {
  // use strip() function only inside the if statement, so as to not change the original array
  const sortedBands = bands.sort( (a, b) => strip(a) > strip(b) ? 1 : -1 );
  output.innerHTML = "";
  sortedBands.forEach(band => output.innerHTML += '<li>' + band + '</li>');
}




sortBtn.addEventListener('click', sortList);
sortWithoutArticlesBtn.addEventListener('click', sortListWithoutArticles);




/* doesnt work, need to use .replace and a regular expression
console.log(bands);

bands.forEach(band => {
  firstWord = band.split(" ") || {};
  if(firstWord.shift().includes("The")) {
    band.replace('The ', '');  
  } else if(firstWord.shift().includes("An")) {
    band.replace('The ', '') 
  } else if(firstWord.shift().includes("A")) {
    band.replace('The ', '')
  }
  strippedBands.push(band);
  //strippedBands.push(band.replace('An ', ''));
  //strippedBands.push(band.replace('A ', ''));
});
console.log(strippedBands);
console.log(bands);
*/