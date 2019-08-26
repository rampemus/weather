import React, { useState, useEffect } from 'react'
import forecast3Days from '../services/forecast3Days'
import Today from './weather/todayPanel.js'
import WeekPanel from './weather/weekPanel.js'
import {getTemperatureSeries, getWindSpeedSeries, getHumiditySeries } from '../utils/valueSeriesHelper'
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

    //returns series of temperature, humidity and windspeed for the rest of the day
    const getTodayData = (forecast) => {
        const now = new Date()
        //tomorrows morning 6 am
        const GMT = 3
        const AM = 6 - GMT
        const endOfDay = new Date( now.valueOf() - now.valueOf()%(1000*60*60*24) + 1000*60*60*AM + 1000*60*60*24 )
        // console.log('from: ' + now + ' to: ' + endOfDay)
        const result = { temperature: getTemperatureSeries(forecast,now,endOfDay), windSpeed: getWindSpeedSeries(forecast,now,endOfDay), humidity:getHumiditySeries(forecast,now,endOfDay) }
        // console.log('getTodayData', result)
        return result
    }

    //returns series of temperature, humidity and windspeed for the selected dayNumber 0=today, 1=tomorrow, 2=the day after
    const getDayData = (forecast, dayNumber) => {
        const now = new Date()
        //tomorrow morning 0 am
        const GMT = 3
        const startOfDay = new Date( now.valueOf() - now.valueOf()%(1000*60*60*24) + 1000*60*60*24*dayNumber - 1000*60*60*GMT )
        const endOfDay = new Date(startOfDay.valueOf() + 1000*60*60*24)
        const result = { temperature: getTemperatureSeries(forecast,startOfDay,endOfDay), windSpeed: getWindSpeedSeries(forecast,startOfDay,endOfDay), humidity:getHumiditySeries(forecast,startOfDay,endOfDay) }
        return result
    }

    //returns multiple series of temperature, humidity and windspeed for the following days
    const getWeekData = (forecast) => {
        const result = [getDayData(forecast,1),getDayData(forecast,2)]
        return result
    }

    return <div className='weatherContainer'>
        <input type='text' onChange={handleLocationChange} value={location} className='textInput'/>
            <div className='weatherPanel'>
                <Today className='weatherPanelItem' data={getTodayData(forecast)}/>
                <WeekPanel className='weatherPanelItem' data={getWeekData(forecast)}/>
            </div>
        </div>
}

export default Weather
