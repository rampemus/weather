import React, { useState, useEffect } from 'react'
import { getTemperatureSeries,getWindSpeedSeries,getHumiditySeries } from '../../utils/valueSeriesHelper'
import Day from './dayPanel'

const WeekPanel = (props) => {


    const [data, setData] = useState([
        {
            temperature: [0,0,0],
            windSpeed:[0,0,0],
            humidity:[0,0,0]
        },
        {
            temperature: [0,0,0],
            windSpeed:[0,0,0],
            humidity:[0,0,0]
        }
    ])

    useEffect(() => {
        
        if (props.data.locations) {
            const now = new Date()
            const GMT = 3
            //tomorrow morning 0 am
            const startOfDay = new Date( now.valueOf() - now.valueOf()%(1000*60*60*24) + 1000*60*60*24*1 - 1000*60*60*GMT )
            const endOfDay = new Date(startOfDay.valueOf() + 1000*60*60*24)
            const endOfSecondDay = new Date(endOfDay.valueOf() + 1000*60*60*24)
            setData([
                {
                    temperature: getTemperatureSeries(props.data,startOfDay,endOfDay),
                    windSpeed: getWindSpeedSeries(props.data,startOfDay,endOfDay), humidity:getHumiditySeries(props.data,startOfDay,endOfDay)
                },
                {
                    temperature: getTemperatureSeries(props.data,endOfDay,endOfSecondDay),
                    windSpeed: getWindSpeedSeries(props.data,endOfDay,endOfSecondDay), humidity:getHumiditySeries(props.data,endOfDay,endOfSecondDay)
                }
            ])
        }

    },[props.data])


    const tomorrow = data[0]
    const theDayAfter = data[1]

    const weekdays =  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const tomorrowName = weekdays[new Date().getDay()+1]
    const theDayAfterName = weekdays[new Date().getDay()+2]

    return <div>
        <Day weekdayName={tomorrowName} data={tomorrow}/>
        <Day weekdayName={theDayAfterName} data={theDayAfter}/>
    </div>
}

export default WeekPanel
