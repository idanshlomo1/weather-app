"use client"
import { useGlobalContext } from '@/lib/globalContext'
import { SunDim } from 'lucide-react'
import React, { } from 'react'
import { Progress } from './ui/progress'

const UvIndex = () => {

    const { uvIndexForecast } = useGlobalContext()

    if (
        !uvIndexForecast ||
        !uvIndexForecast.daily
    ) {
        return <div>Loading...</div>
    }

    const { daily } = uvIndexForecast
    const { uv_index_clear_sky_max, uv_index_max } = daily

    const uvIndexMax = uv_index_max[0]

    const uvIndexCategory = (uvIndex: number) => {
        if (uvIndex <= 2) {
            return {
                description: "Low",
                protection: "No protection required",
            };
        } else if (uvIndex <= 5) {
            return {
                description: "Moderate",
                protection: "Stay in shade near midday.",
            };
        } else if (uvIndex <= 7) {
            return {
                description: "High",
                protection: "Wear a hat and sunglasses.",
            };
        } else if (uvIndex <= 10) {
            return {
                description: "Very High",
                protection: "Apply sunscreen SPF 30+ every 2 hours.",
            };
        } else if (uvIndex > 10) {
            return {
                description: "Extreme",
                protection: "Avoid being outside.",
            };
        } else {
            return {
                description: "Extreme",
                protection: "Avoid being outside.",
            };
        }
    };


    return (
        <div className="pt-6 pb-5 px-4 h-48 border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none">
            <div className="top">
                <h2 className='flex items-center gap-2 font-medium'>
                    <SunDim size={15} />
                    Uv Index
                </h2>

                <div className='pt-4 flex flex-col gap-2'>

                    <p className='pt-4 description-2xl'>
                        {uvIndexMax}
                        <span className='text-sm'>
                            ({uvIndexCategory(uvIndexMax).description})
                        </span>
                    </p>

                    <Progress
                        value={uvIndexMax}
                        max={14}
                        className='progress'
                    />

                </div>
                <p className='text-sm pt-4'>
                    {uvIndexCategory(uvIndexMax).protection}
                </p>
            </div>
        </div>
    )
}

export default UvIndex
