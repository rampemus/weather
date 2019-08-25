const Metolib = require('@fmidev/metolib')

const forecast3Days = (location) => {
    let result = ''

    //TODO:mock server instead of normal query
    let SERVER_URL = 'http://opendata.fmi.fi/wfs'
    if ( process.env.NODE_ENV !== "production" ) {
        //uses local mock address
        SERVER_URL = '/wfs'

        const data = {info: 'mockData'}

        result = data
        console.log('forecast: ', JSON.stringify(data))
    } else {

        //fmi::observations::weather::multipointcoverage
        const STORED_QUERY_OBSERVATION = 'fmi::forecast::harmonie::hybrid::point::multipointcoverage'

        let connection = new Metolib.WfsConnection()
        if (connection.connect(SERVER_URL, STORED_QUERY_OBSERVATION)) {
            // Connection was properly initialized. So, get the data.

            //GeopHeight,Temperature,Pressure,Humidity,WindDirection,WindSpeedMS,WindUMS,WindVMS,MaximumWind,WindGust,DewPoint,TotalCloudCover,WeatherSymbol3,LowCloudCover,MediumCloudCover,HighCloudCover,Precipitation1h,PrecipitationAmount,RadiationGlobalAccumulation,RadiationLWAccumulation,RadiationNetSurfaceLWAccumulation,RadiationNetSurfaceSWAccumulation,RadiationDiffuseAccumulation,LandSeaMask

            connection.getData({
                requestParameter: 'Temperature,Humidity,WindDirection,WindSpeedMS',
                begin: new Date(),
                end: new Date(new Date().getTime() + 7*24*60*60*1000),//1 368 352 800 000
                timestep: 60 * 60 * 1000,
                sites: location,
                callback: function(data, errors) {
                    // Handle the data and errors object in a way you choose.
                    result = data
                    console.log('forecast: ', JSON.stringify(data))
                    if ( errors ) {
                        console.log(errors)
                    }
                    // Disconnect because the flow has finished.
                    connection.disconnect()
                }
            })
        }
    }

    return result
}

module.exports = forecast3Days
