import React from 'react'
import Description from './smallDescription'
import './graphics.css'

const Today = (props) => {

    const bgColor = 'lightblue'

    const t = '23 °C'
    const h = '67 %'
    const w = '2 m/s'

    return <div className='todayPanel' style={{ backgroundColor: bgColor }}>
        <h1 style={{textTransform: 'capitalize'}}>Today</h1>
        <svg>
            {/*TODO:create different backgrounds for different weather*/}
            <circle cx={200} cy={100} r={100} fill="yellow" />

            <text x='20' y='30' className='textBig'>{t}</text>
            <text x='20' y='80' className='textMedium'>Wind {w}</text>
            <text x='20' y='110' className='textMedium'>Humidity {h}</text>

        </svg>
        <Description temperature={t} humidity={h} windSpeed={w}/>
    </div>

}

export default Today
