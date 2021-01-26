const request = require('request');

const forecast = (longitude, latitude, forecastCallback) => {
    const url = 'http://api.weatherstack.com/current?access_key=68c45a849c74d5a4880c654292e8f5fa&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json: true }, (error, { body })=>{
        if(error){
           forecastCallback('Unable to connect to weather service')
        }
        else if(body.error){
            forecastCallback('Unable to find location, try different coordinates')
        }
        else{
            const currData = body.current
            const tempature = currData.temperature
            const feelsLike = currData.feelslike
            const weatherDescription = currData.weather_descriptions
            
            data = `${body.current.weather_descriptions}. It is currently ${body.current.temperature} degrees, and it feels like ${body.current.feelslike}`
            forecastCallback(undefined, data)
        }
    })
}

module.exports = forecast