const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');

// getCurrentPosition() can be used to pull position once.
// watchPosition() will continue to pull over time.
// Only pulls data when the device actually moves.
navigator.geolocation.watchPosition((data) => {
  console.log(data);

  speed.textContent = data.coords.speed || 0;

  arrow.style.transform = `rotate(${data.coords.heading}deg)`;
}, 
// if user does not grant access to geolocation data
(error) => {
  console.err(error);
  alert('You must allow access to geolocation data for this app to work.')
});