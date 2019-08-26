//TODO:real implementation
const getTemperatureSeries = (forecast,now,endOfDay) => {
    let result = [22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,4,5]
    for ( let i = 0; i < result.length; i++) {
        result[i] += Math.random()*3
    }
    return result
}
const getWindSpeedSeries = (forecast,now,endOfDay) => {
    let result =  [1,2,1,1,1,2,1,2,3,2,2,3,2,1,2,3,2,2,3,3,3,3,3,3,3,3,2,2,1]
    for ( let i = 0; i < result.length; i++) {
        result[i] += Math.random()
    }
    return result
}
const getHumiditySeries = (forecast,now,endOfDay) => {
    let result = [65,64,63,64,63,64,63,62,62,61,62,63,63,64,64,64,65]
    for ( let i = 0; i < result.length; i++) {
        result[i] += Math.random()*7
    }
    return result
}

module.exports = {
    getTemperatureSeries,
    getWindSpeedSeries,
    getHumiditySeries
}
