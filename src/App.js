import React from 'react'
import Weather from './components/weather'
import './App.css'

function App() {

    const city = 'Helsinki'

    return (
        <div className="App">
            Hello {city}!
            <Weather
                initLocation={city}
            />
        </div>
    )

}

export default App
