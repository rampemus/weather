import axios from 'axios'
import Metolib from '@fmidev/metolib'

const forecast3Days = location => {
    let SERVER_URL = 'http://opendata.fmi.fi/wfs'
    if ( process.env.NODE_ENV !== "production" ) {
        SERVER_URL = '/wfs'
        const request = axios.get(SERVER_URL + '/'+ location)
        return request.then(response => response.data)
    } else {

        //this does not work. It will produce a promise that useEffect cannot handle

        //fmi::observations::weather::multipointcoverage
        const STORED_QUERY_OBSERVATION = 'fmi::forecast::harmonie::hybrid::point::multipointcoverage'

        // console.log('ready to fetch')
        let connection = new Metolib.WfsConnection()
        if (connection.connect(SERVER_URL, STORED_QUERY_OBSERVATION)) {
            // Connection was properly initialized. So, get the data.
            connection.getData({
                requestParameter: 'Temperature,Humidity,WindDirection,WindSpeedMS',
                begin: new Date(),
                end: new Date(new Date().getTime() + 7*24*60*60*1000),//1 368 352 800 000
                timestep: 60 * 60 * 1000,
                sites: location,
                callback: function(data, errors) {
                    // Handle the data and errors object in a way you choose.
                    // console.log('there is info ', JSON.stringify(data))
                    if ( errors ) {
                        // console.log(errors)
                    }
                    // Disconnect because the flow has finished.
                    connection.disconnect()

                    return data
                }
            })
        }
    }
}



export default {
    forecast3Days
}
