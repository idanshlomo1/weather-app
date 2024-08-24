"use client"
import { kelvinToCelsius } from '@/lib/convertions'
import { useGlobalContext } from '@/lib/globalContext'
import { CloudDrizzle, CloudRain, Snowflake, CloudSun, Cloudy } from 'lucide-react'
import React, { useState } from 'react'

const Temperature: React.FC = () => {
    const { forecast } = useGlobalContext();

    if (!forecast || !forecast.weather) {
        return <div>Loading...</div>;
    }

    const { main, weather } = forecast;
    const temp = kelvinToCelsius(main?.temp);
    const minTemp = kelvinToCelsius(main?.temp_min);
    const maxTemp = kelvinToCelsius(main?.temp_max);

    // State
    const [localTime, setLocalTime] = useState<string>("");
    const [currentDay, setCurrentDay] = useState<string>("");

    const { main: weatherMain } = weather[0];

    const getIcon = () => {
        switch (weatherMain) {
            case "Drizzle": return <CloudDrizzle size={30} />
            case "Rain": return <CloudRain size={30} />
            case "Snow": return <Snowflake size={30} />
            case "Clear": return <CloudSun size={30} />
            case "Clouds": return <Cloudy size={30} />
            default: return <CloudSun size={30} />
        }
    }

    return (
        <div className='py-6 border rounded-lg flex flex-col justify-between shadow-sm dark:shadow-none'>
            <p className='flex justify-between items-center'>
                <span className='font-medium'>
                    {currentDay}
                </span>
                <span className='font-medium'>
                    {localTime}
                </span>
            </p>
        </div>
    )
}

export default Temperature;
