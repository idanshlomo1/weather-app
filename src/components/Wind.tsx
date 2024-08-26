"use client"
import { useGlobalContext } from '@/lib/globalContext';
import { WindIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

const Wind = () => {
    const { forecast } = useGlobalContext();

    console.log("wind forecast:", forecast); // Check if forecast is null or undefined

    if (!forecast) {
        console.log("Forecast is null or undefined");
        return <div>Loading forecast...</div>;
    }

    if (!forecast.wind) {
        console.log("Wind data is missing in the forecast");
        return <div>Loading wind data...</div>;
    }

    const windSpeed = forecast.wind.speed;
    const windDir = forecast.wind.deg;

    // Check if wind speed and direction are valid
    if (typeof windSpeed !== 'number' || typeof windDir !== 'number') {
        console.log("Invalid wind data", windSpeed, windDir);
        return <div>Loading wind details...</div>;
    }

    return (
        <div
            className="pt-6 pb-5 px-4 h-48 border rounded-lg flex 
      flex-col gap-3 shadow-sm dark:shadow-none"
        >            <h2 className='flex items-center gap-2 font-medium'>
                <WindIcon size={15} /> Wind
            </h2>
            <div className="compass relative  flex items-center justify-center">
                <div className="image relative">
                    <Image
                        src="/compass_body.svg"
                        alt='compass'
                        width={110}
                        height={110}
                    />
                    <Image
                        src="/compass_arrow.svg"
                        alt='arrow'
                        width={11}
                        height={11}
                        style={{
                            transform: `rotate(${windDir}deg) translateX(-50%)`,
                            height: "100%"
                        }}
                        className='absolute top-0 left-1/2 transition-all duration-500 ease-in-out dark:invert'
                    />
                </div>
                <p className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-sm font-medium'>
                    {Math.round(windSpeed)} m/s
                </p>
            </div>
        </div>
    );
}

export default Wind;
