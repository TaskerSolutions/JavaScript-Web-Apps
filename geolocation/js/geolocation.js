const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');
const text = document.querySelector('.text-output');

// getCurrentPosition() can be used to pull position once.
// watchPosition() will continue to pull over time.
// Only pulls data when the device actually moves.
if (navigator && navigator.geolocation) {
  navigator.geolocation.watchPosition((data) => {
    console.log(data);

    speed.textContent = data.coords.speed || 0;

    arrow.style.transform = `rotate(${data.coords.heading}deg)`;
  }, 
  // if user does not grant access to geolocation data
  (err) => {
    console.err(err);
    alert('You must allow access to geolocation data for this app to work.')
  });

  navigator.geolocation.getCurrentPosition((data) => {

    var myLatlng = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
      var map_options = {
        zoom: 15,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
     map_container = document.getElementById('map');
     var map = new google.maps.Map(map_container, map_options);

  }, 
  // if user does not grant access to geolocation data
  (err) => {
    console.err(err);
    alert('You must allow access to geolocation data for this app to work.')
  });
}