"use client"
import { kelvinToCelsius } from '@/lib/convertions'
import { useGlobalContext } from '@/lib/globalContext'
import { Thermometer } from 'lucide-react'
import { max } from 'moment'
import React from 'react'

const FeelsLike = () => {

    const { forecast } = useGlobalContext()

    if (!forecast || !forecast?.main || !forecast?.main?.feels_like) {
        return <div>Loading...</div>
    }

    const { feels_like, temp_min, temp_max } = forecast?.main

    const feelsLikeText = (
        feelsLike: number,
        minTemo: number,
        maxTemp: number
    ) => {
        const avgTemp = (minTemo + maxTemp) / 2;

        if (feelsLike < avgTemp - 5) {
            return "Feels significantly colder than actual temperature.";
        }
        if (feelsLike > avgTemp - 5 && feelsLike <= avgTemp + 5) {
            return "Feels close to the actual temperature.";
        }
        if (feelsLike > avgTemp + 5) {
            return "Feels significantly warmer than actual temperature.";
        }

        return "Temperature feeling is typical for this range.";
    };

    const feelsLikeDescription = feelsLikeText(feels_like, temp_min, temp_max)

    return (
        <div className='col-span-full sm:col-span-2 pt-6 px-4 h-48 border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none'>
            <div className="top">
                <h2 className='flex items-center gap-2 font-medium'>
                    <Thermometer size={15} /> Feels Like
                </h2>
                <p className='pt-4 text-2xl'>
                    {kelvinToCelsius(feels_like)}°C
                </p>

            </div>
            <p className='text-sm'>
                {feelsLikeDescription}
            </p>
        </div>
    )
}

export default FeelsLike
