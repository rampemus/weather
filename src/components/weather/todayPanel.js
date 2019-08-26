import React from 'react'
import './graphics.css'

const Today = (props) => {

    //Series are array of becoming temperatures for every hour
    const tSeries = props.data.temperature
    const hSeries = props.data.humidity
    const wSeries = props.data.windSpeed

    const bgColor = 'lightblue'

    const average = (array) => {return array.reduce(function(a, b) { return a + b; })}

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
            <text x='20' y='110' className='textMedium'>Humidity {h}</text>

        </svg>
    </div>

}

export default Today
