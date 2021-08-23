// get elements
const player = document.querySelector('.player');
// select following elements from inside the 'player' element
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenBtn = player.querySelector('#fullscreen-btn');

// build functions
function togglePlay() {
  /*// .paused is a property that lives on the video. There is NO .play property
  if(video.paused) {
    video.play()
  } else {
    video.pause()
  }
  // alternative way of writing:
  // store 'play' or 'pause' as a string
  const method = video.paused ? 'play' : 'pause';
  // pass string to video.*string*();
  video[method]();*/ 
  // Extra shorthand:
  video[video.paused ? 'play' : 'pause'](); 
}

// listen for play/pause events incase a play or pause comes from a function that I didn't write
function updateButton() {
  toggle.textContent = this.paused ? '►' : '❚ ❚';
}


function skip() {
  // use parseFloat() to convert string into true number
  // getting dataset from data-skip="" html elements
  video.currentTime += parseFloat(this.dataset.skip);
}


function handleRangeUpdate() {
  //console.log(this.name, this.value)
  // name of the inputs in html (this.name) correspond to the video attributes that are being updated
  video[this.name] = this.value;
}


function handleProgress() {
  // current time / duration will give a value beween 0 and 1.
  // multiply by 100 to give value in percentage
  const percent = (video.currentTime / video.duration) * 100;
  // flex basis is the property that gives the child element of progress bar its width
  progressBar.style.flexBasis = `${percent}%`
}



function scrub(e) {
  //console.log(event);
  // get event (mouseclick) and use .offsetX (position of click relative to element clicked)
  // (e.offsetX / progress.offsetWidth) gives a percentage value
  // multiply that percentage by video duration to give time to scrub to
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  // update video time
  video.currentTime = scrubTime;
}


function toggleFullscreen() {
  if (document.fullscreenElement || /* Standard syntax */
      document.webkitFullscreenElement || /* Safari and Opera syntax */
      document.msFullscreenElement /* IE11 syntax */) {
    /* Close fullscreen */
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  } else {
    /* open fullscreen */
    if (player.requestFullscreen) {
      player.requestFullscreen();
    } else if (player.webkitRequestFullscreen) { /* Safari */
      player.webkitRequestFullscreen();
    } else if (player.msRequestFullscreen) { /* IE11 */
      player.msRequestFullscreen();
    }
  }
}


// add event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
/* (e) => mousedown && scrub(e)
* get event, and pass it to scrub function
* if mousedown is false, returns false and event listener ends
* if mousedown is true, scrub(e) is called
* strange alternative to if statement
*/
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
// Should have used a styled range input for progress bar in retrospect

fullscreenBtn.addEventListener('click', toggleFullscreen);
