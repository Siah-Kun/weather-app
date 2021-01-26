const request = require('request');

const geocode = (address, geocodeCallback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoiampob2xsYW5kIiwiYSI6ImNrazJwdHd4MzBzNGgydXBiNjhtam13NGQifQ.tKKdxLp8WhA2hNX8C7i5UQ&limit=1'
    request({url, json: true}, (error, { body }) => {
        if(error){
            geocodeCallback('Unable to connect to location services')
        }
        else if(body.features.length === 0 ){
            geocodeCallback('Unable to find location. Try another search')
        }
        else{
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            geocodeCallback(undefined, data)
        }
    })
}

module.exports = geocode