let geocoderProvider = 'google'
let httpAdapter = 'https'
let extra = {
    apiKey: 'AIzaSyCNu_EcDT0lIpB5PzSOL9N8qBdPyaPmpl4',
    formatter: null
}

import nodeGeocoder from 'node-geocoder'
let geocoder = nodeGeocoder(geocoderProvider, httpAdapter, extra)

export default function (lat, lng) {
  return geocoder.reverse({lat: lat, lon: lng})
}
