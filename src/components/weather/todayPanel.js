import React, { useState, useEffect } from 'react'
import { getTemperatureSeries,getWindSpeedSeries,getHumiditySeries } from '../../utils/valueSeriesHelper'
import './graphics.css'

const Today = (props) => {

    const [data, setData] = useState({
        temperature: [0,0,0],
        windSpeed:[0,0,0],
        humidity:[0,0,0]
    })

    useEffect(()=> {

        if (props.data.locations) {
            const now = new Date()
            const GMT = 3
            const AM = 6 - GMT
            const endOfDay = new Date( now.valueOf() - now.valueOf()%(1000*60*60*24) + 1000*60*60*AM + 1000*60*60*24 )
            setData({
                temperature: getTemperatureSeries(props.data,now,endOfDay),
                windSpeed: getWindSpeedSeries(props.data,now,endOfDay),
                humidity:getHumiditySeries(props.data,now,endOfDay)
            })
        }

    }, [props.data])
    // console.log('getTodayData', result)

    //Series are array of becoming temperatures for every hour
    const tSeries = data.temperature
    const hSeries = data.humidity
    const wSeries = data.windSpeed

    const bgColor = 'lightblue'

    const average = (array) => {
        if ( array.length > 0 ) {
            return array.reduce(function(a, b) { return a + b; })
        } else {
            return 0
        }
    }

    const tMax = Math.round(Math.max.apply(Math, tSeries))
    const tMin = Math.round(Math.min.apply(Math, tSeries))
    const h = Math.round(average(hSeries)/hSeries.length) + ' %'
    const w = Math.round(average(wSeries)/hSeries.length) + ' m/s'

    return <div className='todayPanel' style={{ backgroundColor: bgColor }}>
        <h1 style={{textTransform: 'capitalize'}}>Today</h1>
        <svg>
            {/*TODO:create different backgrounds for different weather*/}
            <circle cx={200} cy={100} r={100} fill="yellow" />

            <text x='20' y='30' className='textBig'>{tMax > 0 ? '+' : '-'}{tMax}</text>

            <text x='76' y='32' className='textMedium'>/</text>
            <text x='82' y='36' className='textMedium'>{tMin > 0 ? '+' : '-'}{tMin} °C</text>
            <text x='80' y='30' className='textBig'></text>

            <text x='20' y='80' className='textMedium'>Wind {w}</text>
            <text x='20' y='110' className='textMedium' id='humidityText'>Humidity {h}</text>

        </svg>
    </div>

}

export default Today
