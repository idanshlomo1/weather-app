"use client"
import React, { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useGlobalContext } from '@/lib/globalContext';

interface ActiveCityCoords {
    lat: number;
    lon: number;
}

interface FlyToActiveCityProps {
    activeCityCoords: ActiveCityCoords;
}

const FlyToActiveCity: React.FC<FlyToActiveCityProps> = ({ activeCityCoords }) => {
    const map = useMap();

    useEffect(() => {
        if (activeCityCoords) {
            const zoomLevel = 13;
            const flyToOptions = {
                duration: 1.5,
            };

            // Fly to the new location with the specified zoom and options
            map.flyTo([activeCityCoords.lat, activeCityCoords.lon], zoomLevel, flyToOptions);
        }
    }, [activeCityCoords, map]);

    return null;
};

const MapBox: React.FC = () => {
    const lat = 40.7128;
    const lon = -74.006;

    const { forecast } = useGlobalContext()

    if (!forecast || !forecast?.coord) {
        return <div>Loading...</div>
    }


    const activeCityCoords = forecast?.coord


    return (
        <div className='flex-1 basis-1/2 border rounded-lg'>
            <MapContainer
                center={[activeCityCoords.lat, activeCityCoords.lon]}
                zoom={13}
                scrollWheelZoom={false}
                className='rounded-lg mt-4'
                style={{ height: "calc(100% - 2rem)", width: "calc(100% - 2rem)" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Add FlyToActiveCity Component */}
                <FlyToActiveCity activeCityCoords={activeCityCoords} />
            </MapContainer>
        </div>
    );
}

export default MapBox;
