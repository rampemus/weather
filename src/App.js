import React, { useState, useEffect } from 'react'
import Weather from './components/weather'
import './App.css'

function App() {

    const [city, setCity] = useState('Helsinki')

    if ( city ) {
        return (
            <div className="App">
                Hello {city}!
                <Weather
                    initLocation={city}
                />
            </div>
        )
    } else {
        return (
            <div className="App">
                Initial city name missing.
            </div>
        )
    }
}

export default App
