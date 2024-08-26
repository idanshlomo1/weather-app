"use client"

import { useGlobalContext } from '@/lib/globalContext'
import { Eye } from 'lucide-react'
import React from 'react'
import { Skeleton } from './ui/skeleton'

const Visibility = () => {

    const { forecast } = useGlobalContext()

    if (!forecast || !forecast?.visibility) {
        return (
            <div className="pt-6 pb-5 px-4 h-48 border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none">
                <Skeleton className="h-6 w-1/4" /> {/* Heading skeleton */}
                <Skeleton className="h-8 w-1/2" /> {/* Visibility skeleton */}
                <Skeleton className="h-4 w-3/4" /> {/* Description skeleton */}
            </div>
        );
    }

    const { visibility } = forecast;

    const getVisibilityDescription = (visibility: number) => {
        const visibilityInKm = Math.round(visibility / 1000);

        if (visibilityInKm > 10) return "Excellent: Clear and vast view";
        if (visibilityInKm > 5) return "Good: Easily navigable";
        if (visibilityInKm > 2) return "Moderate: Some limitations";
        if (visibilityInKm <= 2) return "Poor: Restricted and unclear";
        return "Unavailable: Visibility data not available";
    };

    return (
        <div className="pt-6 pb-5 px-4 h-48 border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none">
            <div className="top">
                <h2 className='flex items-center gap-2 font-medium'>
                    <Eye size={15} /> Humidity
                </h2>
                <p className='pt-4 text-2xl'>
                    {Math.round(visibility / 1000)} km
                </p>

            </div>
            <p className='text-sm'>
                {getVisibilityDescription(visibility)}.
            </p>
        </div>
    )
}

export default Visibility
