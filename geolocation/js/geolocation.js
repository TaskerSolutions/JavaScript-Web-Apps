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
    var myKey = 'AIzaSyBuID4F2TON-FI8SGFKcGuC8ST_FYPNWsg';
      var map_options = {
        zoom: 15,
        center: myLatlng,
        key: myKey,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
     map_container = document.getElementById('map');
     var map = new google.maps.Map(map_container, map_options);

    /*var mapUrl = 'https://maps.googleapis.com/maps/api/staticmap?center=40.714%2c%20-73.998&zoom=12&size=400x400&key=AIzaSyBuID4F2TON-FI8SGFKcGuC8ST_FYPNWsg'
    var imgElement = document.getElementById("static-map");
    imgElement.src = mapUrl;*/

  }, 
  // if user does not grant access to geolocation data
  (err) => {
    console.err(err);
    alert('You must allow access to geolocation data for this app to work.')
  });
}