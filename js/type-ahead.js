const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);

function displayMatches() {
  // console.log(this.value);
  const matchArray = findMatches(this.value, cities);
  // console.log(matchArray);

  // matchArray.map() will return an array
  // use .join('') to turn the result into a string
  const html = matchArray.map(place => {
    // use a RegExp to remove the searched term and replace it with a highlighted span
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);

    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// create local array to store data from API call
// could use 'let' rather than 'const'
// a better way is to push items into 'const' to avoid unwanted changed to the array
const cities = [];

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

// fetch() is an API method built into the browser
// fetch returns a 'promise' rather than useable data
fetch(endpoint)
// use .then(blob => ...) to return a response
// fetch doesn't know what type of data is being returned.. (image, html, music, etc.)
// blob must be converted from raw data to JSON (JSON.parse won't work until converted)
// blob.json() returns another promise... must call .then() once again to return a response
  .then(blob => blob.json()
  .then(data => cities.push(...data)));

// ^^^ NOTE ^^^     '...' is an ES6 function to spread. 
// result is that each element from data[] will be pushed as an individual element in cities[]
// without using '...' cities[0] = data[]



// findMatches('bos', cities) --- should return boston, etc.
function findMatches(wordToMatch, cities) {
  // return a filtered version of cities[] array (all results that return from within loop)
  return cities.filter(place => {
    // figure out if city/state matches what was searched
    
    // .match(/wordToMatch/i) is an example of a normal regular expression...
    // to put 'wordToMatch' variable into a regular expression...
    // it must be created outside of the match() function
    // g = global (looks through entire string), i = insensitive (lower or uppercase)
    const regExpression = new RegExp(wordToMatch, 'gi');
    // return cities[city] OR cities[state] if match
    return place.city.match(regExpression) || place.state.match(regExpression);
  });
}