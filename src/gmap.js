import _ from 'underscore'
import infoDisplay from './infoDisplayer'
import getCountry from './reverseGeocode'
import officialInfoDisplayer from './officialInfoDisplayer'

let map, heatmap, mc
let doHeatmap = true

function initMap() {
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

function makeMarker(dataPoint) {
  let icon
  let heat = 0
  if (dataPoint.hasOwnProperty('rating') && dataPoint.hasOwnProperty('intensity')) {
    heat = dataPoint.rating * dataPoint.intensity
  }

  if (heat > 0.5) { icon = 'great.png' }
  else if (heat >= 0) { icon = 'good.png' }
  else if (heat > -0.5) { icon = 'bad.png' }
  else { icon = 'terrible.png' }

  let marker = new google.maps.Marker({
    position: {lat: dataPoint.lat, lng: dataPoint.lng},
    title: dataPoint.text,
    icon: icon,
    heat: heat
  })

  marker.addListener('click', function() {
    console.log(`Clicked - displaying tweet ${dataPoint.text}`)
    infoDisplay.display(dataPoint)
    getCountry(dataPoint.lat, dataPoint.lng)
      .then((data) => {
        let country = data[0]['country']
        let countryCode = data[0]['countryCode']
        officialInfoDisplayer.display(countryCode, country)
      })
      .catch((err) => {
        console.log(err)
        officialInfoDisplayer.error()
      })
  })

  return marker
}

function markerClustererCalculator(markers) {
  let totaller = (total, marker) => {
    return total + marker.heat
  }
  let heat = _.reduce(markers, totaller, 0) / _.size(markers)

  let styleIndex = 3;
  if (heat > 0.5) { styleIndex = 4 }
  else if (heat >= 0) { styleIndex = 3 }
  else if (heat > -0.5) { styleIndex = 2 }
  else { styleIndex = 1 }

  return {
    index: styleIndex,
    text: _.size(markers)
  }
}

function createMarkerClustererStyle(image) {
  return {
    height: 56,
    width: 55,
    url: image,
    textColor: 'white'
  }
}

function renderData(dataList) {
  let markers = _.map(dataList, makeMarker)
  let styles = [
    createMarkerClustererStyle('terribleGroup.png'),
    createMarkerClustererStyle('badGroup.png'),
    createMarkerClustererStyle('goodGroup.png'),
    createMarkerClustererStyle('greatGroup.png')
  ]
  let mcOptions = {
    gridSize: 50,
    maxZoom: 15,
    calculator: markerClustererCalculator,
    styles: styles
  }
  if (mc) {
    console.log("Wiping markers to render new ones...")
    mc.setMap(null);
  }
  mc = new MarkerClusterer(map, markers, mcOptions)
}

function initialise() {
  initMap()
}

export default {
  render: renderData,
  initialise: initialise
}
