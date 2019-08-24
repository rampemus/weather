import React from 'react'
import Description from './smallDescription'

const Today = (props) => {

    const bgColor = 'lightyellow'

    const t = '23 °C'
    const h = '67 %'
    const w = '2 m/s'

    return <div className='todayPanel' style={{ backgroundColor: bgColor }}>
        <h1 style={{textTransform: 'capitalize'}}>Today</h1>
        <Description temperature={t} humidity={h} windSpeed={w}/>
    </div>

}

export default Today
