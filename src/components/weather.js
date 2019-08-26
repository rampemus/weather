import React, { useState, useEffect } from 'react'
import forecast3Days from '../services/forecast3Days'
import Today from './weather/todayPanel.js'
import WeekPanel from './weather/weekPanel.js'
import {getTemperatureSeries, getWindSpeedSeries,getHumiditySeries } from '../utils/valueSeriesHelper'
import './weather.css'

const Weather = (props) => {

    const [location, setLocation] = useState(props.initLocation)
    const [forecast, setForecast] = useState([])

    useEffect(()=> {
        setForecast(() => forecast3Days(location))
    }, [location])

    const handleLocationChange = (event) => {
        setLocation(event.target.value)
    }

    const getTodayData = (forecast) => {
        const now = new Date()
        const endOfDay = new Date( now.valueOf() - now.valueOf()%(1000*60*60*24) + 1000*60*60*3 + 1000*60*60*24 )
        console.log('from: ' + now + ' to: ' + endOfDay)
        const result = { temperature: getTemperatureSeries(forecast,now,endOfDay), windSpeed: getWindSpeedSeries(forecast,now,endOfDay), humidity:getHumiditySeries(forecast,now,endOfDay) }
        console.log('getTodayData', result)
    }

    getTodayData(forecast)

    return <div className='weatherContainer'>
        <input type='text' onChange={handleLocationChange} value={location} className='textInput'/>
            <div className='weatherPanel'>
                <Today className='weatherPanelItem'/>
                <WeekPanel className='weatherPanelItem'/>
            </div>
        </div>
}

export default Weather
