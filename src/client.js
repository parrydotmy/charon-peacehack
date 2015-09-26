import dataAPI from './firebase'
import _ from 'underscore'
import infoDisplay from './infoDisplayer'
import gmap from './gmap'

function initialise() {
  gmap.initialise()
  dataAPI.row(gmap.render)
}

$( document ).ready(initialise)
