const request = require('request')

const forecast = (lat, long, location, callback) => {
	const url = 'https://api.darksky.net/forecast/d73b04a73b6689b0b21506c224a22244/'+ lat +','+ long +'?units=si&lang=es'
	
	request({ url: url, json:true }, (error, response) => {
		if(error) {
			callback('Unable to connect to server', undefined)
		} else if(response.body.error) {
			callback('Unable to find location, please try another location', undefined)
		} else {      
      const body = response.body
      const { temperature } = body.currently
      const { temperatureHigh, temperatureLow } = body.daily.data[0]
			callback(undefined, 
      `La temperatura actual es de: ${Math.round(temperature)} ºC, con una máx prevista de ${Math.round(temperatureHigh)} ºC y mínima de ${Math.round(temperatureLow)} ºC` 
      )
		}
	})
}

module.exports = forecast