import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';

const NewMap = ({ state }) => {
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current && state) {
      const bounds = state.routes[0].bounds;
      mapRef.current.fitBounds([
        [bounds.southwest.lat, bounds.southwest.lng],
        [bounds.northeast.lat, bounds.northeast.lng]
      ]);
    }
  }, [state]);

  return (
    <div style={{ height: '400px' }}>
      <MapContainer
        style={{ height: '100%', width: '100%' }}
        whenCreated={(map) => mapRef.current = map}
      >
        <TileLayer url="https://%7Bs%7D.tile.openstreetmap.org/%7Bz%7D/%7Bx%7D/%7By%7D.png" />
        {state && (
          <Polyline
            positions={state.routes[0].overview_polyline.points}
            color="blue"
          />
        )}
      </MapContainer>
    </div>
  );
};

export default NewMap;