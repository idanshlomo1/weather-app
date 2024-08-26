"use client"
import { unixToTime } from '@/lib/convertions'
import { useGlobalContext } from '@/lib/globalContext'
import { SunsetIcon } from 'lucide-react'
import React from 'react'
import { Skeleton } from './ui/skeleton';

const Sunset = () => {
  const { forecast } = useGlobalContext()

  // Check if forecast, sys, and sunset are available
  if (!forecast || !forecast.sys || typeof forecast.sys.sunset !== 'number' || typeof forecast.sys.sunrise !== 'number') {
    return (
      <div className="pt-6 pb-5 px-4 h-48 border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none">
        <Skeleton className="h-6 w-1/4" /> {/* Heading skeleton */}
        <Skeleton className="h-8 w-1/2" /> {/* Sunset time skeleton */}
        <Skeleton className="h-4 w-1/3" /> {/* Sunrise time skeleton */}
      </div>
    );
  }

  const sunsetTime = unixToTime(forecast.sys.sunset, forecast.timezone)
  const sunriseTime = unixToTime(forecast.sys.sunrise, forecast.timezone)

  return (
    <div className="pt-6 pb-5 px-4 h-48 border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none">
      <div className="top">
        <h2 className='flex items-center gap-2 font-medium'>
          <SunsetIcon size={15} />
          Sunset
        </h2>
        <p className='pt-4 text-2xl'>
          {sunsetTime}
        </p>
      </div>
      <p>
        Sunrise: {sunriseTime}
      </p>
    </div>
  )
}

export default Sunset
