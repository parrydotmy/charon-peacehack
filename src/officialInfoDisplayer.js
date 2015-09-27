import dataAPI from './firebase'

let display = function (countryCode, country) {
  let header = `Official guidelines for ${country}:`
  $('#official-information-header').text(header)
  let callback = function (text) {
    let guideline = text || "Nothing for this country yet."
    $('#official-information').text(guideline)
  }
  dataAPI.getGuildelines(country, callback)
}

let error = function () {
  let headerMessage = 'No official information for this country.'
  console.log("Erroring the reverse geocode")
  $('#official-information-header').text(header)
  $('#official-information').text('')
}

export default {
  display: display,
  error: error
}
