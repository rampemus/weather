import React, { useState, useEffect } from 'react'
import { getTemperatureSeries,getWindSpeedSeries,getHumiditySeries } from '../../utils/valueSeriesHelper'
import { getTomorrowWeekdayName,getDayAfterTomorrowWeekdayName } from '../../utils/weekDayHelper'
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


    const tomorrowData = data[0]
    const theDayAfterData = data[1]

    const tomorrowName = getTomorrowWeekdayName()
    const theDayAfterName = getDayAfterTomorrowWeekdayName()

    return <div>
        <Day weekdayName={tomorrowName} data={tomorrowData}/>
        <Day weekdayName={theDayAfterName} data={theDayAfterData}/>
    </div>
}

export default WeekPanel
