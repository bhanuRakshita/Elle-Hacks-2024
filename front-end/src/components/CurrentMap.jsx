import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100vw',
  height: '95vh',
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export default function CurrentMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, 
  });
  
  const [currentLocation, setCurrentLocation] = useState();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      }, (error) => {
        console.error("Error getting the location: ", error);
      });
    }
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return currentLocation ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={currentLocation}
      options={options}
    >
    </GoogleMap>
  ) : (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={{
        lat: 43.718371, // Example latitude for New York City
        lng: -79.5428663, // Example longitude for New York City
      }}
      options={options}
    >
    </GoogleMap>
  );
}