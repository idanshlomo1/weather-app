"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";
import { AirQuality, Forecast } from '@/lib/types';

interface GlobalContextType {
    forecast: Forecast | null;
    airQuality: AirQuality | null;  // You can specify a more precise type for air quality data if needed
}

interface GlobalContextUpdateType {
    fetchForecast: () => Promise<void>;
    fetchAirQuality: () => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
const GlobalContextUpdate = createContext<GlobalContextUpdateType | undefined>(undefined);

export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [forecast, setForecast] = useState<Forecast | null>(null);
    const [airQuality, setAirQuality] = useState<AirQuality | null>(null);

    const fetchForecast = async () => {
        try {
            const response = await axios.get("/api/weather");
            setForecast(response.data);
            console.log("response: ", response.data);
        } catch (error) {
            console.log("Error fetching forecast data: ", error);
        }
    };

    const fetchAirQuality = async () => {
        try {
            const response = await axios.get("/api/pollution");
            setAirQuality(response.data);
            console.log("response: ", response.data);
        } catch (error) {
            console.log("Error fetching air quality data: ", error);
        }
    };

    useEffect(() => {
        fetchForecast();
        fetchAirQuality();
    }, []);

    return (
        <GlobalContext.Provider value={{ forecast, airQuality }}>
            <GlobalContextUpdate.Provider value={{ fetchForecast, fetchAirQuality }}>
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalContextProvider");
    }
    return context;
};

export const useGlobalContextUpdate = (): GlobalContextUpdateType => {
    const context = useContext(GlobalContextUpdate);
    if (!context) {
        throw new Error("useGlobalContextUpdate must be used within a GlobalContextProvider");
    }
    return context;
};
