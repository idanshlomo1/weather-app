"use client"
import { unixToTime } from '@/lib/convertions'
import { useGlobalContext } from '@/lib/globalContext'
import { SunsetIcon } from 'lucide-react'
import React from 'react'

const Sunset = () => {
  const { forecast } = useGlobalContext()

  // Check if forecast, sys, and sunset are available
  if (!forecast || !forecast.sys || typeof forecast.sys.sunset !== 'number' || typeof forecast.sys.sunrise !== 'number') {
    return <div>Loading...</div>
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
