import dataAPI from './firebase'
import gmap from './gmap'

let hashtag = "grapevinesyria"

function initialise() {
  gmap.initialise()
  dataAPI.row(hashtag, gmap.render)
}

$( document ).ready(initialise)
