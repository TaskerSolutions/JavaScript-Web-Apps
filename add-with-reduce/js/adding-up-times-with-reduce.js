// print data-time attribute to html
const videos = document.querySelectorAll('li');
videos.forEach(video => video.innerHTML += `<span class="float-right">${video.dataset.time}</div>`);
const inputBtn = document.querySelector('#input-btn');
const output = document.querySelector('.output');
/*
// select all elements with data-time attribute. allows for elements other than <li> to be included
const timeNodes = document.querySelectorAll('[data-time]');

// convert the timeNodes nodelist to an array using ES6 spread [...timeNodes]
// or Array.from(timeNodes)
const array = [...timeNodes];

const seconds = array
  .map(node => node.dataset.time)
  .map(timeCode => {
    // split the string into an array of "minutes" and "seconds"
    //const mins = parseInt( timeCode.split(":").shift() );
    //const secs = parseInt( timeCode.split(":").pop() );
    // shorter ES6 way of writing the above:
    // .map(parseFloat) will run parseFloat() on every item in the array.
    const [mins, secs] = timeCode.split(':').map(parseFloat);
    // the following wont work (return value is not iterable)
    //const [mins, secs] = parseFloat( timeCode.split(':') );

    return mins * 60 + secs;
  });

// .reduce(total, value) is an array function
// add each element of seconds array as 'value' to result of 'total'
const totalSeconds = seconds.reduce((total, value) => total + value);
*/

// Shorthand BUT WAY LESS READABLE way of writing the above:
const totalSeconds = Array.from(document.querySelectorAll('[data-time]'))
  .map(node => node.dataset.time).map(timeCode => {
    const [mins, secs] = timeCode.split(':').map(parseFloat);
    return mins * 60 + secs;
  }).reduce((total, x) => total + x);



// create a variable to keep a running tally of the seconds left
let secondsLeft = totalSeconds;

const hours = Math.floor(secondsLeft / 3600);
// mod operator (%) will return the remainder
secondsLeft = secondsLeft % 3600;

const mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;


function printResults() {
  output.innerHTML = `
    Total Seconds = ${totalSeconds}<br>
    Total Time = ${hours}h ${mins}m ${secondsLeft}s
  `
}

inputBtn.addEventListener('click', printResults);