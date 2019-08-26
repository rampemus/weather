import React from 'react'
import Description from './smallDescription'

const Day = (props) => {
    const bgColor = 'lightyellow';

    //Series are array of becoming temperatures for every hour
    const tSeries = props.data.temperature
    const hSeries = props.data.humidity
    const wSeries = props.data.windSpeed

    const average = (array) => {return array.reduce(function(a, b) { return a + b; })}

    const tMax = Math.round(Math.max.apply(Math, tSeries))
    const t = tMax + ' °C'

    const h = Math.round(average(hSeries)/hSeries.length) + ' %'
    const w = Math.round(average(wSeries)/hSeries.length) + ' m/s'

    return <div className='dayPanel' style={{ backgroundColor: bgColor }}>

        <span className='dayName'>{props.weekdayName}</span> <Description temperature={t} humidity={h} windSpeed={w}/>
    </div>
}

export default Day
