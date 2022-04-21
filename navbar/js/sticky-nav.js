const nav = document.querySelector('#main');

let topOfNav = nav.offsetTop;



function fixNav() {
  if (window.scrollY >= topOfNav) {
    // add class to body, so it can work on any child of body, instead of just the navbar
    // to add extra effects, just use .fixed-nav li.logo {...}
    document.body.classList.add('fixed-nav');
    // when nav is made fixed, the content jumps up to fill the space left behind
    document.body.style.paddingTop = nav.offsetHeight + "px";
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}



window. addEventListener('scroll', fixNav);
window. addEventListener('resize', () => { 
  topOfNav = nav.offsetTop;
});