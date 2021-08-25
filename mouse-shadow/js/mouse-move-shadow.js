// hero is the area in which mouse movement will be listened for
const hero = document.querySelector('.hero');

// elements that an effect will be applied to
const text = document.querySelector('h1');
const feature = document.querySelectorAll('.feature');
const pupil = document.querySelectorAll('.pupil');

// walk is 2x the max distance that the shadow effect can stretch in each direction
const walk = 30;


function shadow(e) {
  //const width = hero.offsetWidth;
  //const height = hero.offsetHeight;
  // shorthand ES6 way of writing the above
  const { offsetWidth: width, offsetHeight: height } = hero;

  let { offsetX: x, offsetY: y } = e;
  // currently the event (e) is giving x and y values for chilren of the 'hero' element
  // to circumvent this problem
  // 'this' = 'hero' element. 'e.target' = what the event triggered on (could be a child element)
  if (this !== e.target) {
    x = x + e.target.offsetLeft;
    y = y + e.target.offsetTop;
  }
  //console.log(x, y);

  // xWalk and yWalk are the length of the effect
  const xWalk = Math.round(( x / width * walk ) - ( walk / 2 ));
  const yWalk = Math.round(( y / height * walk ) - ( walk / 2 ));
  //console.log(xWalk, yWalk);
  
  // style the elements with the given effects
  text.style.textShadow = `
    ${xWalk}px ${yWalk}px 3px grey
  `;

  feature.forEach(eye => eye.style.transform = `
    translate(${xWalk}px, ${yWalk/2}px)
  `);

  pupil.forEach(eye => eye.style.transform = `
    translate(${xWalk/2}px, ${yWalk/4}px)
  `);
}



hero.addEventListener('mousemove', shadow);




// ADD Phone movement (accalerometer) support