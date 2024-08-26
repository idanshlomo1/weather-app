"use client"

import { useGlobalContext } from '@/lib/globalContext'
import { Gauge } from 'lucide-react'
import React from 'react'

const Pressure = () => {

    const { forecast } = useGlobalContext()

    if (!forecast || !forecast?.main || !forecast?.main?.pressure) {
        return <div>Loading...</div>
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
        <div className='col-span-full sm:col-span-2 pt-6 px-4 h-48 border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none'>
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
