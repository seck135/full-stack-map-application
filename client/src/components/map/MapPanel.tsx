import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon as LeafletPolygon, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import type { Polygon, ObjectMarker, LatLng } from '../../types/types';

// Fix for default marker icon in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface MapPanelProps {
    polygons: Polygon[];
    objects: ObjectMarker[];
    onPolygonClick: (polygon: Polygon) => void;
    onObjectClick: (object: ObjectMarker) => void;
    onMapClick: (latlng: LatLng) => void;
    drawingMode: 'polygon' | 'marker' | 'none';
}

const MapEventsHandler: React.FC<{ onMapClick: (latlng: LatLng) => void; drawingMode: 'polygon' | 'marker' | 'none' }> = ({ onMapClick, drawingMode }) => {
    useMapEvents({
        click(e) {
            if (drawingMode === 'marker' || drawingMode === 'polygon') {
                onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
            }
        },
    });
    return null;
};

const MapPanel: React.FC<MapPanelProps> = ({
    polygons,
    objects,
    onPolygonClick,
    onObjectClick,
    onMapClick,
    drawingMode,
}) => {
    const mapCenter: LatLng = { lat: 33.9, lng: 18.4 };

    return (
        <MapContainer
            center={[mapCenter.lat, mapCenter.lng]}
            zoom={13}
            style={{ height: '100vh', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapEventsHandler onMapClick={onMapClick} drawingMode={drawingMode} />

            {/* Render Polygons */}
            {polygons.map((polygon) => (
                <LeafletPolygon
                    key={polygon.id}
                    positions={polygon.coordinates.map((coord) => [coord.lat, coord.lng])}
                    pathOptions={{ color: 'blue' }}
                    eventHandlers={{
                        click: () => onPolygonClick(polygon),
                    }}
                >
                    <Popup>{polygon.name}</Popup>
                </LeafletPolygon>
            ))}

            {/* Render Object Markers */}
            {objects.map((obj) => (
                <Marker
                    key={obj.id}
                    position={[obj.coordinate.lat, obj.coordinate.lng]}
                    eventHandlers={{
                        click: () => onObjectClick(obj),
                    }}
                >
                    <Popup>{obj.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapPanel;