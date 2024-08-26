"use client"
import { useGlobalContext } from '@/lib/globalContext'
import { Droplets } from 'lucide-react'
import React from 'react'
import { Skeleton } from './ui/skeleton'

const Humidity = () => {

    const { forecast } = useGlobalContext()

    if (!forecast || !forecast?.main || !forecast?.main?.humidity) {
        return (
            <div className="pt-6 pb-5 px-4 h-48 border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none">
                <Skeleton className="h-6 w-1/4" /> {/* Heading skeleton */}
                <Skeleton className="h-8 w-1/2" /> {/* Humidity skeleton */}
                <Skeleton className="h-4 w-3/4" /> {/* Description skeleton */}
            </div>
        )
    }

    const { humidity } = forecast?.main


    const getHumidityText = (humidity: number) => {
        if (humidity < 30) return "Dry: May cause skin irritation";
        if (humidity >= 30 && humidity < 50)
            return "Comfortable: Ideal for health and comfort";
        if (humidity >= 50 && humidity < 70)
            return "Moderate: Sticky, may increase allergens";
        if (humidity >= 70) return "High: Uncomfortable, mold growth risk";
        return "Unavailable: Humidity data not available";
    };


    return (
        <div className="pt-6 pb-5 px-4 h-48 border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none">
            <div className="top">
                <h2 className='flex items-center gap-2 font-medium'>
                    <Droplets size={15} /> Humidity
                </h2>
                <p className='pt-4 text-2xl'>
                    {humidity}
                </p>

            </div>
            <p className='text-sm'>
                {getHumidityText(humidity)}.
            </p>
        </div>
    )
}

export default Humidity
