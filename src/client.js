import dataAPI from './firebase'
import _ from 'underscore'
import infoDisplay from './infoDisplayer'
import gmap from './gmap'

window.dataAPI = dataAPI

let map

function initialise() {
  gmap.initialise()
  dataAPI.row(gmap.renderData)
}

$( document ).ready(initialise)
