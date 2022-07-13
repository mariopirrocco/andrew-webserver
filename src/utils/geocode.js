const request = require('request')

const geocode = (address, callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFyaW9waXJyb2NjbyIsImEiOiJjbDU4OXNyZm8xeDdtM2RvMzdhNjhvemU3In0.9O0uz9QvSdWILMIOL2D5Gg&limit=1'

	request({ url: url, json:true }, (error, response) => {
		if(error) {
			callback('Unable to connect to location services', undefined)
		} else if(response.body.features.length === 0) {
			callback('Unable to find location, please try another search', undefined)
		} else {
			callback(undefined, {
				lat: response.body.features[0].center[1],
				long: response.body.features[0].center[0],
				location: response.body.features[0].place_name
			})
		}
	})
}

module.exports = geocode
  
