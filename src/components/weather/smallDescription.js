import React from 'react'

const Description = (props) => {
    return <div>{props.temperature}&nbsp;&nbsp;{props.humidity}&nbsp;&nbsp;{props.windSpeed}</div>
}

export default Description
