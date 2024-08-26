"use client"
import { kelvinToCelsius, unixToDay } from '@/lib/convertions'
import { useGlobalContext } from '@/lib/globalContext'
import { CalendarDays } from 'lucide-react'
import React from 'react'

// Define the interface for dailyData
interface DailyData {
    main: {
        temp_min: number;
        temp_max: number;
    };
    dt: number;
}

const FiveDayForecast = () => {
    const { fiveDayForecast } = useGlobalContext();

    if (!fiveDayForecast || !fiveDayForecast.city || !fiveDayForecast.list) {
        return <div>Loading...</div>;
    }

    const { city, list } = fiveDayForecast;

    const processData = (dailyData: DailyData[]) => {
        let minTemp = Number.MAX_VALUE;
        let maxTemp = Number.MIN_VALUE;

        dailyData.forEach((day: DailyData) => {
            if (day.main.temp_min < minTemp) {
                minTemp = day.main.temp_min;
            }
            if (day.main.temp_max > maxTemp) {
                maxTemp = day.main.temp_max;
            }
        });

        return {
            day: unixToDay(dailyData[0].dt),
            minTemp: kelvinToCelsius(minTemp),
            maxTemp: kelvinToCelsius(maxTemp),
        };
    };

    const dailyForecasts = [];

    for (let i = 0; i < 40; i += 8) {
        const dailyData = list.slice(i, i + 5) as DailyData[]; // Use the DailyData interface
        dailyForecasts.push(processData(dailyData));
    }

    return (
        <div className='px-4 py-6 flex-1 border rounded-lg flex flex-col justify-between shadow-sm dark:shadow-none'>
            <div>
                <h2 className='flex items-center gap-2 font-medium'>
                    <CalendarDays size={15} /> 5-Day Forecast for {city.name}
                </h2>

                <div className="forecast-list pt-3">
                    {dailyForecasts.map((day, i) => {
                        return (
                            <div
                                key={i}
                                className="daily-forecast py-4 flex flex-col justify-evenly border-b-2"
                            >
                                <p className="text-xl min-w-[3.5rem]">{day.day}</p>
                                <p className="text-sm flex justify-between">
                                    <span>(low)</span>
                                    <span>(high)</span>
                                </p>

                                <div className="flex-1 flex items-center justify-between gap-4">
                                    <p className="font-bold">{day.minTemp}°C</p>
                                    <div className="progress flex-1 w-full h-2 rounded-lg"></div>
                                    <p className="font-bold">{day.maxTemp}°C</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FiveDayForecast;
