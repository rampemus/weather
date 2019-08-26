//TODO:real implementation
const getTemperatureSeries = (forecast,now,endOfDay) => {
    return [22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,4,5]
}
const getWindSpeedSeries = (forecast,now,endOfDay) => {
    return [1,2,1,1,1,2,1,2,3,2,2,3,2,1,2,3,2,2,3,3,3,3,3,3,3,3,2,2,1]
}
const getHumiditySeries = (forecast,now,endOfDay) => {
    return [65,64,63,64,63,64,63,62,62,61,62,63,63,64,64,64,65]
}

module.exports = {
    getTemperatureSeries,
    getWindSpeedSeries,
    getHumiditySeries
}
