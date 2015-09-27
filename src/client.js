import dataAPI from './firebase'
import gmap from './gmap'
import _ from 'underscore'

let allMarkers = {}

function updateMarkers(data) {
  let newMarkers = {}
  _.each(data, (value, key, list) => {
    if (!_.has(allMarkers, key)) {
      newMarkers[key] = value
    }
  })

  if (_.size(newMarkers) > 0) {
    allMarkers = _.extend(allMarkers, newMarkers)
    console.log("New markers! Re-rendering...")
    gmap.render(allMarkers)
  }
}

function initialise() {
  let ht = $('#hashtaginput').val()
  if (ht == "") {
    ht = "#grapevinesyria"
  }
  gmap.initialise()
  dataAPI.row(ht, updateMarkers)
  window.setInterval(() => {
    let ht = $('#hashtaginput').val()
    dataAPI.row(ht, updateMarkers)
  }, 5000)
}

$( document ).ready(initialise)
