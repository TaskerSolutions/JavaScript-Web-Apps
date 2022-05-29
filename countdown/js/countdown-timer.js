// declare variable to store interval in
let countdown;

const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // set interval is unreliable: when tabbed away, when scrolling on IOS, when page slow.
  // setInterval(function() { seconds --; }, 1000);

  // when did the timer start
  // Date.now() returns the current milliseconds from Jan 1st 1970
  const now = Date.now();
  // find milliseconds difference between then and now
  const then = now + seconds * 1000;

  // setInterval doesn't run immediately, but instead after the first interval has transpired.
  // Run function once to display the first second
  displayTimeLeft(seconds);
  displayEndTime(then);
  
  countdown = setInterval(() => {
    // call Date.now() again to get new current time in ms
    // divide by 1000 to get seconds.
    // wrap in Math.round to level off inconsistencies
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    // check if interval should be stopped
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    // display time
    displayTimeLeft(secondsLeft);

  }, 1000)
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const hours = Math.floor(minutes / 60);
  const remainderMinutes = minutes % 60;
  const days = Math.floor(hours / 24);
  const remainderHours = hours % 24;

  //${remainderSeconds < 10 ? '0' : ''} is to put a 0 before seconds if single didgit
  const display = `
    ${days > 0 ? days + 'd ' + remainderHours + 'h ' : ''}
    ${hours > 0 && days <= 0 ? hours + 'h ' : ''}
    ${remainderMinutes}m
    ${remainderSeconds < 10 ? '0' + remainderSeconds : remainderSeconds}s
  `;

  timerDisplay.textContent = display;

  // change the title that displays in the tab of web browser
  document.title = display;

  //console.log(days, hours, minutes, seconds)
}


function displayEndTime(timestamp) {
  const end = new Date(timestamp)
  // when passing a millisecond amount to Date() it will return a proper date such as Jan 20 2022 14:18:17 GMT-0500 (EST)
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' + minutes : minutes}`;
}

function startTimer() {
  // returns string of number of seconds featured in HTML dataset
  // wrap in parseInt to turn into a real number
  const seconds = parseInt(this.dataset.time);
  clearInterval(countdown);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

// can select a DOM element that has a 'name' attribute.
// nested name attriubtes also works. eg. customForm.minutes
document.customForm.addEventListener('submit', function(e) {
  // prevent default form action (GET)
  e.preventDefault();

  // select minutes input element using this.minutes
  const mins = this.minutes.value;
  console.log(mins)
  clearInterval(countdown);
  timer(mins * 60);
  this.reset();
});


timer(86402)