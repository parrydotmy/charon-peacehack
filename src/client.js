let map

window.initMap = function () {
  map = new google.maps.Map(document.getElementById('map-mount'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}

$( document ).ready(window.initMap)
