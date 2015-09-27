import dataAPI from './firebase'
import gmap from './gmap'
import _ from 'underscore'

let hashtag = "grapevinesyria"
let allMarkers = {}

function updateMarkers(data) {
  let newMarkers = {}
  _.each(data, (value, key, list) => {
    if (!_.has(allMarkers, key)) {
      newMarkers[key] = value
    }
  })

  if (_.size(newMarkers) > 0) {
    console.log("New markers! Re-rendering...")
    gmap.render(newMarkers)
    allMarkers = _.extend(allMarkers, newMarkers)
  }
}

function initialise() {
  gmap.initialise()
  dataAPI.row(hashtag, updateMarkers)
  window.setInterval(() => {
    dataAPI.row(hashtag, updateMarkers)
  }, 5000)

}

$( document ).ready(initialise)
