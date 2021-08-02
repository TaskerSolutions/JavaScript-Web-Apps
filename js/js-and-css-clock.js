const digitalBox = document.getElementById("date");
const secondHand = document.getElementById("second");
const minuteHand = document.getElementById("minute");
const hourHand = document.getElementById("hour");
var now = new Date();
var seconds = now.getSeconds();
var secondsDegrees = seconds / 60 * 360 + 90;
var minutes = now.getMinutes();
var minutesDegrees = (minutes + seconds / 60) / 60 * 360 + 90;
var hours = now.getHours();
var hoursDegrees = (hours + (minutes + seconds / 60) / 60) / 12 * 360 + 90;

// set initial times to avoid delay
secondHand.style.transform = 'rotate(' + secondsDegrees + 'deg)';
minuteHand.style.transform = 'rotate(' + minutesDegrees + 'deg)';
hourHand.style.transform = 'rotate(' + hoursDegrees + 'deg)';

/* 
ideally all time keeping should be done within the function.
re checking the date() every second will be more accurate than relying on javascript to count 1000ms
however tallying within the function avoids the hands reversing when they reache 0 deg (12 on clock)
*/

function changeTime() {
  now = new Date();
  digitalBox.innerHTML = now;

  secondsDegrees += 6;
  secondHand.style.transform = 'rotate(' + secondsDegrees + 'deg)';

  minutesDegrees += 0.1;
  minuteHand.style.transform = 'rotate(' + minutesDegrees + 'deg)';
  
  // to test at faster speeds
  //seconds ++;
  //if (seconds % 60 == 0) {
    
  // once every minute change hour hand by 0.5 degrees
  if (now.getSeconds() == 0) {
    hoursDegrees += 0.5;
    hourHand.style.transform = 'rotate(' + hoursDegrees + 'deg)';
  }
}

setInterval(changeTime, 1000);