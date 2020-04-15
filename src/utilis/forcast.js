const request = require ('request')

const forecast = (latitude, longitude, callback)=>{
const url = 'https://api.darksky.net/forecast/6f9c15b4391576a6a1eda23fc8ca5a95/' + latitude + ',' + longitude
request({url, json:true}, (error, {body})=>{
    if (error){
        callback('Unable to connect to weather services!', undefined)
    }else if(body.error){
        callback('Try another search', undefined)
    }else{
        callback(undefined, body.daily.data[0].summary + '. There is a ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
    }
})
}
module.exports=forecast