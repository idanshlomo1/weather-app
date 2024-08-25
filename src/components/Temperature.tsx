"use client"
import { kelvinToCelsius } from '@/lib/convertions';
import { useGlobalContext } from '@/lib/globalContext';
import { CloudDrizzle, CloudRain, Snowflake, CloudSun, Cloudy, Navigation } from 'lucide-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const Temperature: React.FC = () => {
    const { forecast } = useGlobalContext();

    // Ensure the forecast and its required properties are available
    if (!forecast || !forecast.main || !forecast.weather || forecast.weather.length === 0) {
        return <div>Loading...</div>;
    }

    const { main, timezone, name, weather } = forecast;
    const temp = kelvinToCelsius(main?.temp);
    const minTemp = kelvinToCelsius(main?.temp_min);
    const maxTemp = kelvinToCelsius(main?.temp_max);

    // State
    const [localTime, setLocalTime] = useState<string>("");
    const [currentDay, setCurrentDay] = useState<string>("");

    // Safely handle the weather array
    const weatherMain = weather[0]?.main || "Clear";
    const description = weather[0]?.description || "clear sky";

    const getIcon = () => {
        switch (weatherMain) {
            case "Drizzle": return <CloudDrizzle size={30} />;
            case "Rain": return <CloudRain size={30} />;
            case "Snow": return <Snowflake size={30} />;
            case "Clear": return <CloudSun size={30} />;
            case "Clouds": return <Cloudy size={30} />;
            default: return <CloudSun size={30} />;
        }
    };

    useEffect(() => {
        if (!timezone) return;

        // Update time every second
        const interval = setInterval(() => {
            const localMoment = moment().utcOffset(timezone / 60);

            // Custom format: 24-hour format
            const formattedTime = localMoment.format("HH:mm:ss");

            // Day of the week
            const day = localMoment.format("dddd");

            setLocalTime(formattedTime);
            setCurrentDay(day);
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);

    }, [timezone]); // Only run effect when 'timezone' changes

    return (
        <div className='px-4 py-6 border rounded-lg flex flex-col justify-between shadow-sm dark:shadow-none'>
            <p className='flex justify-between items-center'>
                <span className='font-medium'>
                    {currentDay}
                </span>
                <span className='font-medium'>
                    {localTime}
                </span>
            </p>
            <p className='pt-2 font-bold flex gap-1'>
                <span>{name}</span>
                <Navigation size={15} />
            </p>
            <p className='py-10 text-9xl font-bold self-center'>
                {temp}°
            </p>

            <div>
                <div>
                    <span>{getIcon()}</span>
                    <p className='pt-2 capitalize text-lg font-medium'>
                        {description}
                    </p>
                </div>
                <p className='flex gap-2 items-center'>
                    <span>Low: {minTemp}°</span>
                    <span>High: {maxTemp}°</span>
                </p>
            </div>
        </div>
    );
};

export default Temperature;
