"use client"

import { useGlobalContext } from '@/lib/globalContext'
import { Gauge } from 'lucide-react'
import React from 'react'
import { Skeleton } from './ui/skeleton'

const Pressure = () => {

    const { forecast } = useGlobalContext()

    if (!forecast || !forecast?.main || !forecast?.main?.pressure) {
        return (
            <div className="pt-6 pb-5 px-4 h-48 border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none">
                <Skeleton className="h-6 w-1/4" /> {/* Heading skeleton */}
                <Skeleton className="h-8 w-1/2" /> {/* Pressure skeleton */}
                <Skeleton className="h-4 w-3/4" /> {/* Description skeleton */}
            </div>
        );
    }

    const { pressure } = forecast?.main;

    const getPressureDescription = (pressure: number) => {
        if (pressure < 1000) return "Very low pressure";

        if (pressure >= 1000 && pressure < 1015)
            return "Low pressure. Expect weather changes.";

        if (pressure >= 1015 && pressure < 1025)
            return "Normal pressure. Expect weather changes.";

        if (pressure >= 1025 && pressure < 1040)
            return "High pressure. Expect weather changes.";

        if (pressure >= 1040) return "Very high pressure. Expect weather changes.";

        return "Unavailable pressure data";
    };

    return (
        <div className="pt-6 pb-5 px-4 h-48 border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none">
            <div className="top">
                <h2 className='flex items-center gap-2 font-medium'>
                    <Gauge size={15} /> Pressure
                </h2>
                <p className='pt-4 text-2xl'>
                    {pressure} hPa
                </p>

            </div>
            <p className='text-sm'>
                {getPressureDescription(pressure)}.
            </p>
        </div>
    )
}

export default Pressure
