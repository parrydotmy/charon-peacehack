import dataAPI from './firebase'
import _ from 'underscore'

window.dataAPI = dataAPI

let map

function initMap() {
  map = new google.maps.Map(document.getElementById('map-mount'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  })
}

function renderMarker(dataPoint) {
  let marker = new google.maps.Marker({
    position: {lat: dataPoint.lat, lng: dataPoint.long},
    map: map,
    title: dataPoint.text
  });
}

function renderData(dataList) {
  _.each(dataList, renderMarker)
}

function initialise() {
  initMap()
  // Grab data
  dataAPI.row(renderData)
  // Add markers to map
}

$( document ).ready(initialise)
