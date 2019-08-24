import React from 'react'
import Description from './smallDescription'

const Day = (props) => {
    const bgColor = 'lightyellow';

    const t = '23 °C'
    const h = '67 %'
    const w = '2 m/s'

    return <div className='dayPanel' style={{ backgroundColor: bgColor }}>

        <span className='dayName'>{props.weekdayName}</span> <Description temperature={t} humidity={h} windSpeed={w}/>
    </div>
}

export default Day
