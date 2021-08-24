const slideImages = document.querySelectorAll('.slide-in');

function checkSlide(e) {
  //console.log(e)

  slideImages.forEach(image => {
    // important to recalculate image position each time user scrolls.
    // this allows page to be resized & elements can be added/removed

    // (pixels scrolled from top of page + window height) - half of image height
    // slideInAt gives a value that is halfway through the image
    const slideInAt = (window.scrollY + window.innerHeight) - image.height / 2;
    //console.log('window.scrollY = ' + window.scrollY)
    //console.log(slideInAt)
    
    // .offsetTop gives how far the image is from the top of the page
    const imageBottom = image.offsetTop + image.height;
    
    // good practise to put these statements into variables so that code is more readable
    const isHalfShown = slideInAt > image.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;

    if(isHalfShown && isNotScrolledPast) {
      image.classList.add('active');
    } else {
      image.classList.remove('active');
    }

  });
}

// only run the function every 10ms by wrapping it in debounce
window.addEventListener('scroll', debounce(checkSlide));



// generic debounce function. Could also use one built into a framework
function debounce(func, wait = 10, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};