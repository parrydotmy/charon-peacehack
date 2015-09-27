import dataAPI from './firebase'
import gmap from './gmap'
import _ from 'underscore'

let hashtag = "grapevinesyria"
let markers

function updateMarkers(newMarkers) {
  markers = _.filter(newMarkers, (obj) => { return !_.findWhere(markers, obj); });
  gmap.render(markers)
}

function initialise() {
  gmap.initialise()
  dataAPI.row(hashtag, updateMarkers)
  window.setInterval(() => {
    dataAPI.row(hashtag, updateMarkers)
  }, 5000)

}

$( document ).ready(initialise)
