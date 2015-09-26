let display = function (countryCode, country) {
  console.log(`Displaying info for country ${countryCode}`)
  let header = `Official guidelines for ${country}:`
  let text = 'Fetching guidelines...'
  $('#official-information-header').text(header)
  $('#official-information').text(text)
}

let error = function () {
  let headerMessage = 'No official information for this country.'
  $('#official-information-header').text(header)
  $('#official-information').text('')
}

export default {
  display: display,
  error: error
}
