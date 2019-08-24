import React, { useState, useEffect } from 'react'
import Weather from './components/weather'
import './App.css'

function App() {

    const [city, setCity] = useState('Helsinki')

    return (
        <div className="App">
            Hello {city}!
            <Weather
                location={city}
            />
        </div>
    );
}

export default App
