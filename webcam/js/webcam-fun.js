/*
@@@@@@@@@@@@@@@@@@@@@  NOTE :  @@@@@@@@@@@@@@@@@@@@@@@@@@
page must be running on a server for webcam to work
*/

const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const alphaInput = document.querySelector('#alpha');
let alpha = alphaInput.value;
alphaInput.addEventListener('input', () => alpha = alphaInput.value);

function getVideo() {
  // the following will return a promise.
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
  })
  // Use .then() to use the promise.
  .then(localMediaStream => {
    video.srcObject = localMediaStream;
    video.play();
  })
  // use .catch() to handle errors incase browser does not allow webcam use.
  .catch(err => alert(err));

}


function paintToCanvas() {
  const width = video.videoWidth; 
  const height = video.videoHeight;
  // width & height coming in from webcam (640, 480)
  // set the canvas width & height in HTML DOM. (CSS will still apply, but the HTML attributes are explicit)
  canvas.width = width;
  canvas.height = height;

  // every 16ms (60fps) take image from webcam and paint it to the canvas
  // using return allows access to the interval to call clear interval etc.
  return setInterval(() => {
    // draw 'video' element on canvas 'ctx' covering entire canvas
    ctx.drawImage(video, 0, 0, width, height);

    // get pixels from canvas
    let pixels = ctx.getImageData(0, 0, width, height);

    // at 0.1, ten frames will show at once. 0.1 is 10% transparency
    // this is because the canvas does not clear its previous state before painting the new one
    ctx.globalAlpha = alpha / 10;

        
    // pixels = applyFilter(pixels);
    // pixels = rgbSplit(pixels);

    greenScreen(pixels);

    // paint the pixels back onto the canvas
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}


function takePhoto() {
  // handle audio
  snap.currentTime = 0;
  snap.play();

  // take data out of canvas. Gives image in text format
  const data = canvas.toDataURL('image/jpeg');
  
  // create a link element <a></a>
  const link = document.createElement('a');
  // assign href="data"
  link.href = data;
  // 
  link.setAttribute('download', 'Webcam Snapshot');
  link.innerHTML = `<img src="${data}" alt="Snapshot" />`;
  // inset the 'link' into 'strip' element, before the first child.
  strip.insertBefore(link, strip.firstChild);
}


function applyFilter(pixels) {
  // pixels is not an array. pixels.data is a unit8ClampedArray (for extremely long arrays.)
  // each pixel's has 4 values (r, g, b, alpha) so increment for loop by 4 to target only red values
  for( i = 0; i < pixels.data.length; i += 4 ) {
    // accessing a variable from inside this for loop will cause a crash
    // red
    pixels.data[i] = pixels.data[i] + 100;
    // green
    pixels.data[i + 1] = pixels.data[i + 1];
    // blue
    pixels.data[i + 2] = pixels.data[i + 2];
  }

  // return pixels so they can be painted back into canvas
  return pixels;
}



function rgbSplit(pixels) {
  for( i = 0; i < pixels.data.length; i += 4 ) {
    // take pixel that is 100px back and make it equal to current color
    pixels.data[i - 100] = pixels.data[i];
    pixels.data[i + 100] = pixels.data[i + 1];
    pixels.data[i - 100] = pixels.data[i + 2];
  }

  // return pixels so they can be painted back into canvas
  return pixels;
}


function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // pixels.data[i + 3] is the alpha value of the pixel. set it to 0 to take the pixel out.
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}



getVideo();

// once video has loaded enough to play, start painting to canvas.
video.addEventListener('canplay', paintToCanvas);
