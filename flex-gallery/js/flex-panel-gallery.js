const panels = document.querySelectorAll('.panel');


function toggleOpen() {
  this.classList.toggle('open');
}

function toggleActive(event) {
  //console.log(event.propertyName);
  if(event.propertyName.includes('flex')) {
    this.classList.toggle('open-active');
  }
}

panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));

// remove open-active class after 1 second to avoid a bug on load
setTimeout(function() {
  panels.forEach(panel => panel.classList.remove('open-active'));
}, 1000);