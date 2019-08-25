import React, { useState, useEffect } from 'react'
import forecast3Days from '../services/forecast3Days'
import Today from './weather/todayPanel.js'
import WeekPanel from './weather/weekPanel.js'
import './weather.css'

const Weather = (props) => {

    const [location, setLocation] = useState(props.initLocation)
    const [forecast, setForecast] = useState([])

    useEffect(()=> {
        setForecast(() => forecast3Days(location))
    }, [location])

    return <div className='weatherPanel'>
        <Today className='weatherPanelItem'/>
        <WeekPanel className='weatherPanelItem'/>
    </div>
}

export default Weather
