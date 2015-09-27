import dataAPI from './firebase'

let error = function () {
  let headerMessage = 'No official information for this country.'
  $('#official-information-header').text(headerMessage)
  $('#info-blockquote').hide()
  $('#official-information').text('')
  $('#official-information-footer').text('')
}

let display = function (countryCode, country) {
  let header = `Official guidelines for ${country}:`
  $('#official-information-header').text(header)
  let callback = function (text, footer) {
    console.log(`Guideline text: ${text}, footer ${footer}`)
    $('#official-information').text(text)
    $('#official-information-footer').text(footer)
    $('#info-blockquote').show()
  }
  dataAPI.getGuildelines(countryCode, callback, error)
}

export default {
  display: display,
  error: error
}
