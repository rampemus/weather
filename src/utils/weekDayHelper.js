const weekdays =  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const getTomorrowWeekdayName = () => weekdays[new Date().getDay()+1]
const getDayAfterTomorrowWeekdayName = () => weekdays[new Date().getDay()+2]

module.exports = {
    getTomorrowWeekdayName,
    getDayAfterTomorrowWeekdayName
}
