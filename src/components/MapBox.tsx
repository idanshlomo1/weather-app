import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useGlobalContext } from '@/lib/globalContext';
import { Coords } from '@/lib/types';
import { Skeleton } from './ui/skeleton';

const FlyToActiveCity: React.FC<{ activeCityCoords: Coords }> = ({ activeCityCoords }) => {
    const map = useMap();

    useEffect(() => {
        if (activeCityCoords) {
            console.log("Flying to coordinates:", activeCityCoords);
            const zoomLevel = 13;
            const flyToOptions = {
                duration: 1.5,
            };
            map.flyTo([activeCityCoords.lat, activeCityCoords.lon], zoomLevel, flyToOptions);
        }
    }, [activeCityCoords, map]);

    return null;
};

const MapBox: React.FC = () => {
    const { forecast } = useGlobalContext();

    if (!forecast || !forecast.coord) {
        return (
            <div className='flex-1 basis-1/2 border rounded-lg p-4'>
                <Skeleton className='rounded-lg' style={{ height: "500px", width: "100%" }} /> {/* Map skeleton */}
            </div>
        );
    }

    const activeCityCoords = forecast.coord;

    return (
        <div className='flex-1 basis-1/2 border rounded-lg p-4 z-0'>
            <MapContainer
                center={[activeCityCoords.lat, activeCityCoords.lon]}
                zoom={13}
                scrollWheelZoom={false}
                className='rounded-lg'
                style={{ height: "500px", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FlyToActiveCity activeCityCoords={activeCityCoords} />
            </MapContainer>
        </div>
    );
}

export default MapBox;
