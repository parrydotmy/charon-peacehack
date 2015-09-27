import _ from 'underscore'
import infoDisplay from './infoDisplayer'
import getCountry from './reverseGeocode'
import officialInfoDisplayer from './officialInfoDisplayer'

let map, heatmap
let doHeatmap = true

function initAutocomplete() {
  map = new google.maps.Map(document.getElementById('map-mount'), {
    center: {lat: 47.606163, lng: 7.558594},
    zoom: 3,
    mapTypeControl: false
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

function renderMarker(dataPoint) {
  let icon
  let heat = 0
  if (dataPoint.hasOwnProperty('rating') && dataPoint.hasOwnProperty('intensity')) {
    heat = dataPoint.rating * dataPoint.intensity
  }
  switch(heat) {
    case (heat > 0.5):
      icon = 'great.png'
      break
    case (heat > 0):
      icon = 'good.png'
      break
    case (heat > -0.5):
      icon = 'bad.png'
      break
    default:
      icon = 'terrible.png'
  }
  let marker = new google.maps.Marker({
    position: {lat: dataPoint.lat, lng: dataPoint.lng},
    map: map,
    title: dataPoint.text,
    icon: icon
  })

  marker.addListener('click', function() {
    infoDisplay.display(dataPoint)
    getCountry(dataPoint.lat, dataPoint.lng)
      .then((data) => {
        let country = data[0]['country']
        let countryCode = data[0]['countryCode']
        officialInfoDisplayer.display(countryCode, country)
      })
      .catch((err) => {
        officialInfoDisplayer.error()
      })
  })
}

function renderData(dataList) {
  _.each(dataList, renderMarker)
}

function initialise() {
  initAutocomplete()
}

export default {
  render: renderData,
  initialise: initialise
}
