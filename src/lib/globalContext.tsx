"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";
import { AirQuality, Forecast, FiveDayForecast, UVIndexForecast, Coords } from '@/lib/types';  // Added UVIndexForecast type
import { defaultStates } from "./defaultStates";
import { debounce } from "lodash"

interface GlobalContextType {
    forecast: Forecast | null;
    airQuality: AirQuality | null;
    fiveDayForecast: FiveDayForecast | null;
    uvIndexForecast: UVIndexForecast | null;
    geoCodedList: typeof defaultStates;
    inputValue: string;  // Added inputValue to GlobalContextType
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;  

}

interface GlobalContextUpdateType {
    fetchForecast: (coords: Coords) => Promise<void>;  // Added Coords parameter
    fetchAirQuality: (coords: Coords) => Promise<void>;
    fetchFiveDayForecast: (coords: Coords) => Promise<void>;
    fetchUVIndexForecast: (coords: Coords) => Promise<void>;
    setActiveCityCoords: React.Dispatch<React.SetStateAction<Coords>>; // Add this line

}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
const GlobalContextUpdate = createContext<GlobalContextUpdateType | undefined>(undefined);

export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [forecast, setForecast] = useState<Forecast | null>(null);
    const [airQuality, setAirQuality] = useState<AirQuality | null>(null);
    const [fiveDayForecast, setFiveDayForecast] = useState<FiveDayForecast | null>(null);
    const [uvIndexForecast, setUVIndexForecast] = useState<UVIndexForecast | null>(null);
    const [geoCodedList, setGeoCodedList] = useState(defaultStates);
    const [inputValue, setInputValue] = useState<string>("");
    const [activeCityCoords, setActiveCityCoords] = useState<Coords>({
        lat: 51.752021,  // key-value pairs
        lon: -1.257726,  // key-value pairs
    });
    const fetchForecast = async ({ lat, lon }: Coords) => {
        try {
            const response = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`);
            setForecast(response.data);
            console.log("Forecast response:", response.data);
        } catch (error) {
            console.log("Error fetching forecast data:", error);
        }
    };

    const fetchAirQuality = async ({ lat, lon }: Coords) => {
        try {
            const response = await axios.get(`/api/pollution?lat=${lat}&lon=${lon}`);
            setAirQuality(response.data);
            console.log("Air quality response:", response.data);
        } catch (error) {
            console.log("Error fetching air quality data:", error);
        }
    };

    const fetchFiveDayForecast = async ({ lat, lon }: Coords) => {
        try {
            const response = await axios.get(`/api/fiveday?lat=${lat}&lon=${lon}`);
            setFiveDayForecast(response.data);
            console.log("Five-day forecast response:", response.data);
        } catch (error) {
            console.log("Error fetching five-day forecast data:", error);
        }
    };

    const fetchUVIndexForecast = async ({ lat, lon }: Coords) => {
        try {
            const response = await axios.get(`/api/uv?lat=${lat}&lon=${lon}`);
            setUVIndexForecast(response.data);
            console.log("UV Index forecast response:", response.data);
        } catch (error) {
            console.log("Error fetching UV index forecast data:", error);
        }
    };


    const fetchGeoCodedList = async (search: string) => {
        try {
            const response = await axios.get(`/api/geocoded?search=${search}`);
            setGeoCodedList(response.data);
            console.log("Geo coded response:", response.data);
        } catch (error) {
            console.log("Error fetching Geo coded data:", error);
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        if (e.target.value === "") {
            setGeoCodedList(defaultStates);
        }
    };



    useEffect(() => {

        const debouncedFetch = debounce((search: string) => {
            fetchGeoCodedList(search)
        }, 500)

        if (inputValue) {
            debouncedFetch(inputValue);
        }

        return () => debouncedFetch.cancel();

    }, [inputValue]);



    useEffect(() => {
        fetchForecast(activeCityCoords);
        fetchAirQuality(activeCityCoords);
        fetchFiveDayForecast(activeCityCoords);
        fetchUVIndexForecast(activeCityCoords);
        fetchGeoCodedList("liverpool")
    }, [activeCityCoords]);

    return (
        <GlobalContext.Provider value={{ forecast, airQuality, fiveDayForecast, uvIndexForecast, geoCodedList, inputValue, handleInput }}>
            <GlobalContextUpdate.Provider value={{ fetchForecast, fetchAirQuality, fetchFiveDayForecast, fetchUVIndexForecast,    setActiveCityCoords 
 }}>
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
