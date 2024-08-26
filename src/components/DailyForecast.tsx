"use client"
import { useGlobalContext } from '@/lib/globalContext'
import { CloudDrizzle, CloudRain, CloudSun, Cloudy, Snowflake } from 'lucide-react'
import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import moment from 'moment'
import { kelvinToCelsius } from '@/lib/convertions'
import { Skeleton } from './ui/skeleton';

const DailyForecast = () => {
  const { forecast, fiveDayForecast } = useGlobalContext()

  if (!fiveDayForecast || !fiveDayForecast.city || !fiveDayForecast.list || !forecast || !forecast.weather || forecast.weather.length === 0) {
    return (
      <div className='col-span-full sm:col-span-2 pt-6 px-4 h-48 border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none'>
        <Skeleton className="h-6 w-1/3" /> {/* Carousel Heading skeleton */}
        <div className="h-full flex gap-10 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="w-32 h-full" /> 
          ))}
        </div>
      </div>
    );
  }

  const { city, list } = fiveDayForecast;
  const { weather } = forecast;

  const today = new Date();
  const todayString = today.toISOString().split("T")[0];
  const todaysForecast = list.filter((forecast) => forecast.dt_txt.startsWith(todayString));

  const getIcon = () => {
    const weatherMain = weather[0]?.main || "Clear";
    switch (weatherMain) {
      case "Drizzle": return <CloudDrizzle size={30} />;
      case "Rain": return <CloudRain size={30} />;
      case "Snow": return <Snowflake size={30} />;
      case "Clear": return <CloudSun size={30} />;
      case "Clouds": return <Cloudy size={30} />;
      default: return <CloudSun size={30} />;
    }
  };

  return (
    <div className='col-span-full sm:col-span-2 pt-6 px-4 h-48 border rounded-lg flex flex-col gap-8 shadow-sm dark:shadow-none'>
      <div className='h-full flex gap-10 overflow-hidden'>
        {todaysForecast.length < 1 ? (
          <h1 className='text-muted-foreground'>No forecast data available</h1>
        ) : (
          <div className='w-full'>
            <Carousel>
              <CarouselContent>
                {todaysForecast.map((forecast, index: number) => (
                  <CarouselItem key={index} className='flex flex-col gap-4 basis-32 cursor-grab'>
                    <p className='text-muted-foreground'>
                      {moment(forecast.dt_txt).format("HH:mm")}
                    </p>
                    <p>
                      {getIcon()}
                    </p>
                    <p className='mt-4'>
                      {kelvinToCelsius(forecast.main.temp)}°C
                    </p>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}

export default DailyForecast;
