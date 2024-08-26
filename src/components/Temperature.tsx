"use client"
import { kelvinToCelsius } from '@/lib/convertions';
import { useGlobalContext } from '@/lib/globalContext';
import { CloudDrizzle, CloudRain, Snowflake, CloudSun, Cloudy, Navigation } from 'lucide-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';

const Temperature: React.FC = () => {
    const { forecast } = useGlobalContext();

    // Ensure the forecast and its required properties are available
    if (!forecast || !forecast.main || !forecast.weather || forecast.weather.length === 0) {
        return (
            <div className="px-4 py-6 border rounded-lg flex flex-col justify-between shadow-sm dark:shadow-none">
                <Skeleton className="w-1/3 h-6 mb-4" /> {/* Day of the week skeleton */}
                <Skeleton className="w-1/4 h-6 mb-4" /> {/* Local time skeleton */}
                <Skeleton className="w-1/2 h-8 mb-8" /> {/* Location skeleton */}
                <Skeleton className="w-32 h-32 mb-8 self-center" /> {/* Temperature skeleton */}
                <Skeleton className="w-1/4 h-6 mb-4" /> {/* Weather icon */}
                <Skeleton className="w-1/2 h-6 mb-4" /> {/* Weather description */}
                <Skeleton className="w-full h-6" /> {/* Low/High temperature */}
            </div>

        )
    }

    const { main, timezone, name, weather } = forecast;
    const temp = kelvinToCelsius(main?.temp);
    const minTemp = kelvinToCelsius(main?.temp_min);
    const maxTemp = kelvinToCelsius(main?.temp_max);

    // State
    const [localTime, setLocalTime] = useState<string>("");
    const [currentDay, setCurrentDay] = useState<string>("");

    // Initialize time and day immediately on component mount
    useEffect(() => {
        if (timezone) {
            const localMoment = moment().utcOffset(timezone / 60);

            // Initial time and day setting
            setLocalTime(localMoment.format("HH:mm:ss"));
            setCurrentDay(localMoment.format("dddd"));

            // Start interval for real-time updates
            const interval = setInterval(() => {
                const updatedMoment = moment().utcOffset(timezone / 60);
                setLocalTime(updatedMoment.format("HH:mm:ss"));
                setCurrentDay(updatedMoment.format("dddd"));
            }, 1000);

            // Cleanup interval on component unmount
            return () => clearInterval(interval);
        }
    }, [timezone]);

    const getIcon = () => {
        const weatherMain = weather[0]?.main || "Clear";
        switch (weatherMain) {
            case "Drizzle": return <CloudDrizzle size={30} />;
            case "Rain": return <CloudRain size={30} />;
            case "Snow": return <Snowflake size={30} />;
            case "Clear": return <CloudSun size={30} />;
            case "Clouds": return <Cloudy size={30} />;
            default: return <CloudSun size={30} />;
        }
    };

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
                        {weather[0]?.description || "clear sky"}
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
