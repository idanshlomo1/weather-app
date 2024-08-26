"use client"
import { formatNumber } from '@/lib/convertions'
import { useGlobalContext } from '@/lib/globalContext'
import { UsersRound } from 'lucide-react'
import React from 'react'
import { Skeleton } from './ui/skeleton';

const Population = () => {
    const { fiveDayForecast } = useGlobalContext()

    if (!fiveDayForecast || !fiveDayForecast.city) {
        return (
            <div className="pt-6 pb-5 px-4 h-48 border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none">
                <Skeleton className="h-6 w-1/4" /> {/* Heading skeleton */}
                <Skeleton className="h-8 w-1/2" /> {/* Population skeleton */}
                <Skeleton className="h-4 w-1/3" /> {/* Description skeleton */}
            </div>
        );
    }

    const { city } = fiveDayForecast;

    return (
        <div className="pt-6 pb-5 px-4 h-48 border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none">
            <div className="top">
                <h2 className='flex items-center gap-2 font-medium'>
                    <UsersRound size={15} /> Population
                </h2>
                <p className='pt-4 text-2xl'>
                    {formatNumber(city.population)}
                </p>
                <p className='text-sm'>
                    Latest UN population data for {city.name}
                </p>
            </div>
        </div>
    )
}

export default Population;
