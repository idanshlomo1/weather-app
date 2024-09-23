'use client'

import React, { useCallback, useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { useGlobalContext, useGlobalContextUpdate } from '@/lib/globalContext'
import { Coords } from '@/lib/types'
import { Skeleton } from '@/components/ui/skeleton'

const containerStyle = {
  width: '100%',
  height: '500px'
}

export default function MapBox() {
  const { forecast } = useGlobalContext()
  const { setActiveCityCoords } = useGlobalContextUpdate()
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  })

  const center: Coords = forecast?.coord ? {
    lat: forecast.coord.lat,
    lon: forecast.coord.lon
  } : { lat: 51.752021, lon: -1.257726 } // Default to Oxford, UK if no forecast

  const onLoad = useCallback((map: google.maps.Map) => {
    map.setCenter({ lat: center.lat, lng: center.lon })
    setMap(map)
  }, [center])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  useEffect(() => {
    if (map && forecast?.coord) {
      map.panTo({ lat: forecast.coord.lat, lng: forecast.coord.lon })
    }
  }, [map, forecast])

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat()
      const lon = e.latLng.lng()
      setActiveCityCoords({ lat, lon })
    }
  }, [setActiveCityCoords])

  if (!isLoaded) {
    return (
      <div className='flex-1 basis-1/2 border rounded-lg p-4'>
        <Skeleton className='rounded-lg' style={{ height: "500px", width: "100%" }} />
      </div>
    )
  }

  return (
    <div className='flex-1 basis-1/2 border rounded-lg p-4 z-0'>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: center.lat, lng: center.lon }}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
      >
        <Marker position={{ lat: center.lat, lng: center.lon }} />
      </GoogleMap>
    </div>
  )
}