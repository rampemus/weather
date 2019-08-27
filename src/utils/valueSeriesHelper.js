//TODO:real implementation
const getTemperatureSeries = (forecast,startOfDay,endOfDay) => {
    // console.log('timeStamp' + new Date(startOfDay) + 'endOfDay' + new Date(endOfDay))
    let result = []
    const valuePairs = forecast.locations[0].data.Temperature.timeValuePairs
    for ( let i = 0; i < valuePairs.length; i++) {
        let timeStamp = new Date(valuePairs[i].time)
        if ( startOfDay < timeStamp && timeStamp < endOfDay) {

            result.push(valuePairs[i].value)
            console.log(timeStamp + valuePairs[i].value)
        }
    }
    return result
}
const getWindSpeedSeries = (forecast,startOfDay,endOfDay) => {
    // console.log(forecast.locations[0].data)
    let result = []
    const valuePairs = forecast.locations[0].data.WindSpeedMS.timeValuePairs
    for ( let i = 0; i < valuePairs.length; i++) {
        let timeStamp = new Date(valuePairs[i].time)
        if ( startOfDay < timeStamp && timeStamp < endOfDay) {

            result.push(valuePairs[i].value)
        }
    }
    return result
}
const getHumiditySeries = (forecast,startOfDay,endOfDay) => {
    let result = []
    const valuePairs = forecast.locations[0].data.Humidity.timeValuePairs
    for ( let i = 0; i < valuePairs.length; i++) {
        let timeStamp = new Date(valuePairs[i].time)
        if ( startOfDay < timeStamp && timeStamp < endOfDay) {

            result.push(valuePairs[i].value)
        }
    }
    return result
}

module.exports = {
    getTemperatureSeries,
    getWindSpeedSeries,
    getHumiditySeries
}
