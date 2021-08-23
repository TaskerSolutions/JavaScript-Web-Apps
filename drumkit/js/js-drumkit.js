var crash = new Audio('sounds/crash-acoustic.wav');
var hiHat1 = new Audio('sounds/hihat-acoustic01.wav');
var hiHat2 = new Audio('sounds/openhat-acoustic01.wav');
var clap = new Audio('sounds/clap-analog.wav');
var snare  = new Audio('sounds/snare-acoustic01.wav');
var tom1  = new Audio('sounds/tom.wav');
var tom2  = new Audio('sounds/tom-acoustic01.wav');
var tom3  = new Audio('sounds/tom-acoustic02.wav');
var kick1 = new Audio('sounds/kick-acoustic01.wav');
var kick2 = new Audio('sounds/kick-heavy.wav');
var ride = new Audio('sounds/ride-acoustic01.wav');

var crashCymbal = document.getElementById("crash-cymbal");
var hiHatCymbal = document.getElementById("hi-hat");
var hiHatPedal = document.getElementById("hi-hat-pedal");
var snareDrum = document.getElementById("snare-drum");
var smallTom = document.getElementById("small-tom");
var mediumTom = document.getElementById("medium-tom");
var largeTom = document.getElementById("large-tom");
var bassDrum = document.getElementById("bass-drum");
var rideCymbal = document.getElementById("ride-cymbal");

crashCymbal.addEventListener("click", function() { playCrash() })
hiHatCymbal.addEventListener("click", function() { playHiHat1() })
hiHatPedal.addEventListener("click", function() { playClap() })
snareDrum.addEventListener("click", function() { playSnare() })
smallTom.addEventListener("click", function() { playTom1() })
mediumTom.addEventListener("click", function() { playTom2() })
largeTom.addEventListener("click", function() { playTom3() })
bassDrum.addEventListener("click", function() { playKick2() })
rideCymbal.addEventListener("click", function() { playRide() })

window.addEventListener("keydown", function (e) {
  if(e.code == "KeyW") { playCrash() }
  if(e.code == "KeyA") { playHiHat1() }
  if(e.code == "KeyS") { playHiHat2() }
  if(e.code == "KeyQ") { playClap() }
  if(e.code == "KeyD") { playKick1() }
  if(e.code == "KeyE") { playKick2() }
  if(e.code == "KeyH") { playSnare() }
  if(e.code == "KeyJ") { playTom1() }
  if(e.code == "KeyK") { playTom2() }
  if(e.code == "KeyL") { playTom3() }
  if(e.code == "KeyN") { playRide() }
})

const keys = document.querySelectorAll('.all');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

function removeTransition(e) {
  if (e.propertyName !== 'transform') return; // skip if it's not a transform
 //console.log(e.propertyName);
 // console.log(this);
  //this.classList.remove("playing");
  keys.forEach(key => key.classList.remove("playing"));
}

function playCrash() {
    crash.currentTime = 0
    crash.play();
    crashCymbal.classList.add("playing");
}

function playHiHat1() {
  clap.pause();
  hiHat2.pause();
  hiHat1.currentTime = 0
  hiHat1.play();
  hiHatCymbal.classList.add("playing");
}

function playHiHat2() {
  clap.pause();
  hiHat1.pause();
  hiHat2.currentTime = 0
  hiHat2.play();
  hiHatCymbal.classList.add("playing");
}

function playClap() {
  hiHat1.pause();
  hiHat2.pause();
  clap.currentTime = 0
  clap.play();
  hiHatPedal.classList.add("playing");
}

function playKick1() {
  kick2.pause();
  kick1.currentTime = 0
  kick1.play();
  bassDrum.classList.add("playing");
}

function playKick2() {
  kick1.pause();
  kick2.currentTime = 0
  kick2.play();
  bassDrum.classList.add("playing");
}

function playSnare() {
  snare.currentTime = 0
  snare.play();
  snareDrum.classList.add("playing");
}

function playTom1() {
  tom1.currentTime = 0
  tom1.play();
  smallTom.classList.add("playing");
}

function playTom2() {
  tom2.currentTime = 0
  tom2.play();
  mediumTom.classList.add("playing");
}

function playTom3() {
  tom3.currentTime = 0
  tom3.play();
  largeTom.classList.add("playing");
}

function playRide() {
  ride.currentTime = 0
  ride.play();
  rideCymbal.classList.add("playing");
}