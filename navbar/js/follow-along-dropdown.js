const triggers = document.querySelectorAll('.top-list > li');
// use querySelector instead of querySelectorAll to avoid returning a node list.
const background = document.querySelector('.dropdown-background');
const topNav = document.querySelector('.top');

function handleEnter() {
  // this = the list item that has been hovered over
  // trigger-enter changes the display of the li element to block
  // You can' no't get width, height properties of something with display: none;
  this.classList.add('trigger-enter');

  // using arrow function instead of normal function here allows the function to inherit the value of 'this' from parent function. Otherwise 'this' would refer to the window.
  // trigger-enter-active changes the opacity to 1 with a transition duration.
  // check  if classlist contains trigger-enter. IF true, add trigger-enter-active.
  // If false, it will act as a boolean and not bother checking second condition.
  setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);

  // open class changes opacity of the white background to 1.
  background.classList.add('open');

  // looking for this const inside the function (using this) to find the .dropdown that lives inside of the selected li item.
  const dropdown = this.querySelector('.dropdown');
  const dropdownCoords = dropdown.getBoundingClientRect();

  // dropdownCoords does not take into account where on the page the parent element is. 
  // Find the coords of the nav parent element and add them to dropdownCoords
  // This should be done inside the function to get new coords every hover incase something on the page changes.
  const navCoords = topNav.getBoundingClientRect();

  const coords = {
    width: dropdownCoords.width,
    height: dropdownCoords.height,
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left
  }

  background.style.setProperty('width', `${coords.width}px`);
  background.style.setProperty('height', `${coords.height}px`);
  background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
}

function handleLeave() {
  this.classList.remove('trigger-enter', 'trigger-enter-active');
  background.classList.remove('open');
}

triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));