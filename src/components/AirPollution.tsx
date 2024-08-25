"use client"
import { useGlobalContext } from '@/lib/globalContext';
import { ThermometerSun } from 'lucide-react';
import React from 'react'
import { Progress } from './ui/progress';
import { airQulaityIndexText } from '@/lib/convertions';

const AirPollution = () => {

    const { airQuality } = useGlobalContext();

    if (
        !airQuality ||
        !airQuality.list ||
        !airQuality.list[0] ||
        !airQuality.list[0].main
    ) {
        return <div>Loading...</div>;
    }

    const airQualityIndex = airQuality.list[0].main.aqi * 10

    const filteredIndex = airQulaityIndexText.find((item) => {
        return item.rating === airQualityIndex
    })

    return (
        <div className='col-span-full sm:col-span-2 pt-6 px-4 h-48 border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none'>
            <h2 className='flex items-center gap-2 font-medium'>
                <ThermometerSun size={15} />
                Air Pollution
            </h2>
            <Progress
                value={airQualityIndex}
                max={100}
                className='progress'
            />
            <p>
                Air Quality is {filteredIndex?.description}
            </p>
        </div>
    )
}

export default AirPollution
