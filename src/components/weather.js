import React, { useState, useEffect } from 'react'
import forecastService from '../services/forecastService'
import Metolib from '@fmidev/metolib'
import Today from './weather/todayPanel.js'
import WeekPanel from './weather/weekPanel.js'
import './weather.css'

const Weather = (props) => {

    const [location, setLocation] = useState(props.initLocation)
    const [inputColor, setInputColor] = useState('white') //'#e6ffe6'
    const [forecast, setForecast] = useState([])

    useEffect(()=> {
        if ( process.env.NODE_ENV !== "production" ) {
            forecastService.forecast3Days(location)
                .then(newData => {
                    setForecast(newData)
                    setInputColor('#e6ffe6')
                    setTimeout(() => {setInputColor('white')}, 1000)
                })
                .catch(error => {
                    setInputColor('#ffcccc')
                })
        } else {
            const SERVER_URL = 'http://opendata.fmi.fi/wfs'
	        //
	        //fmi::observations::weather::multipointcoverage
	        const STORED_QUERY_OBSERVATION = 'fmi::forecast::harmonie::surface::point::multipointcoverage'

	        let connection = new Metolib.WfsConnection()
	        if (connection.connect(SERVER_URL, STORED_QUERY_OBSERVATION)) {
	            // Connection was properly initialized. So, get the data.
                // console.log('end of forecast: ',new Date(new Date().valueOf() + 3*24*60*60*1000))
	            //GeopHeight,Temperature,Pressure,Humidity,WindDirection,WindSpeedMS,WindUMS,WindVMS,MaximumWind,WindGust,DewPoint,TotalCloudCover,WeatherSymbol3,LowCloudCover,MediumCloudCover,HighCloudCover,Precipitation1h,PrecipitationAmount,RadiationGlobalAccumulation,RadiationLWAccumulation,RadiationNetSurfaceLWAccumulation,RadiationNetSurfaceSWAccumulation,RadiationDiffuseAccumulation,LandSeaMask
	            connection.getData({
	                requestParameter: 'Temperature,Humidity,WindDirection,WindSpeedMS',
	                begin: new Date(),
	                end: new Date(new Date().valueOf() + 3*24*60*60*1000),//1 368 352 800 000
	                timestep: 60 * 60 * 1000,
	                sites: location,
	                callback: function(data, errors) {
	                    // Handle the data and errors object in a way you choose.
                        if ( data.info ) {
                            setForecast(data)
                            console.log(data)
                            setInputColor('#e6ffe6')
                        }

	                    // console.log('todayForecast: ', data)
	                    if ( errors.length > 0 ) {
	                        console.log('Errors!: ',errors)
                            setInputColor('#ffcccc')
	                    }
	                    // Disconnect because the flow has finished.
	                    connection.disconnect()
	                }
	            })
            }
        }

    }, [location])

    const handleLocationChange = (event) => {
        setLocation(event.target.value)
    }

    return <div className='weatherContainer'>
        <input
            type='text'
            onChange={handleLocationChange}
            value={location}
            style={{backgroundColor: inputColor}}
            className='textInput'
        />
            <div className='weatherPanel'>
                <Today className='weatherPanelItem' data={forecast}/>
                <WeekPanel className='weatherPanelItem' data={forecast}/>
            </div>
        </div>
}

export default Weather
