import React, { useState, useEffect } from 'react'
import Metolib from '@fmidev/metolib'
import Today from './weather/todayPanel.js'
import WeekPanel from './weather/weekPanel.js'
import './weather.css'

const Weather = (props) => {

    const [forecast, setForecast] = useState([])

    useEffect(()=> {
        //TODO:mock server instead of normal query
        const SERVER_URL = 'http://opendata.fmi.fi/wfs'
        //
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
                sites: props.location,
                callback: function(data, errors) {
                    // Handle the data and errors object in a way you choose.
                    setForecast(data)
                    console.log('forecast: ', JSON.stringify(data))
                    console.log(JSON.stringify({apple:1}))
                    if ( errors ) {
                        console.log(errors)
                    }
                    // Disconnect because the flow has finished.
                    connection.disconnect()
                }
            })
        }

    }, [props.location])

    return <div className='weatherPanel'>
        <Today className='weatherPanelItem'/>
        <WeekPanel className='weatherPanelItem'/>
    </div>
}

export default Weather
