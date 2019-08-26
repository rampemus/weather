import React from 'react'
import Day from './dayPanel'

const WeekPanel = (props) => {

    const tomorrow = props.data[0]
    const theDayAfter = props.data[1]

    const weekdays =  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const tomorrowName = weekdays[new Date().getDay()+1]
    const theDayAfterName = weekdays[new Date().getDay()+2]

    return <div>
        <Day weekdayName={tomorrowName} data={tomorrow}/>
        <Day weekdayName={theDayAfterName} data={theDayAfter}/>
    </div>
}

export default WeekPanel
