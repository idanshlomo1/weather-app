"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";
import { AirQuality, Forecast, FiveDayForecast, UVIndexForecast } from '@/lib/types';  // Added UVIndexForecast type

interface GlobalContextType {
    forecast: Forecast | null;
    airQuality: AirQuality | null;
    fiveDayForecast: FiveDayForecast | null;
    uvIndexForecast: UVIndexForecast | null;  // Added uvIndexForecast to GlobalContextType
}

interface GlobalContextUpdateType {
    fetchForecast: () => Promise<void>;
    fetchAirQuality: () => Promise<void>;
    fetchFiveDayForecast: () => Promise<void>;
    fetchUVIndexForecast: () => Promise<void>;  // Added fetchUVIndexForecast
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
const GlobalContextUpdate = createContext<GlobalContextUpdateType | undefined>(undefined);

export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [forecast, setForecast] = useState<Forecast | null>(null);
    const [airQuality, setAirQuality] = useState<AirQuality | null>(null);
    const [fiveDayForecast, setFiveDayForecast] = useState<FiveDayForecast | null>(null);
    const [uvIndexForecast, setUVIndexForecast] = useState<UVIndexForecast | null>(null);  // Added state for uvIndexForecast

    const fetchForecast = async () => {
        try {
            const response = await axios.get("/api/weather");
            setForecast(response.data);
            console.log("Forecast response:", response.data);
        } catch (error) {
            console.log("Error fetching forecast data:", error);
        }
    };

    const fetchAirQuality = async () => {
        try {
            const response = await axios.get("/api/pollution");
            setAirQuality(response.data);
            console.log("Air quality response:", response.data);
        } catch (error) {
            console.log("Error fetching air quality data:", error);
        }
    };

    const fetchFiveDayForecast = async () => {
        try {
            const response = await axios.get("/api/fiveday");
            setFiveDayForecast(response.data);
            console.log("Five-day forecast response:", response.data);
        } catch (error) {
            console.log("Error fetching five-day forecast data:", error);
        }
    };

    const fetchUVIndexForecast = async () => {  // Corrected the endpoint to /api/uv
        try {
            const response = await axios.get("/api/uv");
            setUVIndexForecast(response.data);
            console.log("UV Index forecast response:", response.data);
        } catch (error) {
            console.log("Error fetching UV index forecast data:", error);
        }
    };

    useEffect(() => {
        fetchForecast();
        fetchAirQuality();
        fetchFiveDayForecast();
        fetchUVIndexForecast();  // Fetch the UV Index forecast on mount
    }, []);

    return (
        <GlobalContext.Provider value={{ forecast, airQuality, fiveDayForecast, uvIndexForecast }}>
            <GlobalContextUpdate.Provider value={{ fetchForecast, fetchAirQuality, fetchFiveDayForecast, fetchUVIndexForecast }}>
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
