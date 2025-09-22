import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon as LeafletPolygon, useMapEvents, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Polygon, ObjectMarker, Coordinate } from '../../types/types';

// תיקון אייקון ברירת מחדל
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
    onMapClick: (coordinate: Coordinate) => void;
    drawingMode: 'polygon' | 'marker' | 'none';
    newPolygonCoordinates: Coordinate[];
}

const MapEventsHandler: React.FC<{ onMapClick: (latlng: Coordinate) => void; drawingMode: 'polygon' | 'marker' | 'none' }> = ({ onMapClick, drawingMode }) => {
    useMapEvents({
        click(e) {
            if (drawingMode === 'marker' || drawingMode === 'polygon') {
                onMapClick({ lat: e.latlng.lat, lon: e.latlng.lng });
            }
        },
    });
    return null;
};

const MapPanel = ({ polygons, objects, onPolygonClick, onObjectClick, drawingMode, onMapClick, newPolygonCoordinates }: MapPanelProps) => {
    const mapCenter: Coordinate = { lat: 31.7683, lon: 35.2137 };

    return (
        <MapContainer className='map-panel' center={[mapCenter.lat, mapCenter.lon]} zoom={13}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapEventsHandler onMapClick={onMapClick} drawingMode={drawingMode} />

            {/* Polygon קיים */}
            {polygons.map((polygon) => (
                <LeafletPolygon
                    key={polygon.id}
                    positions={polygon.coordinates.map((coord) => [coord.lat, coord.lon])}
                    pathOptions={{ color: 'blue' }}
                    eventHandlers={{ click: () => onPolygonClick(polygon) }}
                >
                    <Popup>{polygon.name}</Popup>
                </LeafletPolygon>
            ))}

            {/* Polygon שנבחר עכשיו */}
            {drawingMode === 'polygon' && newPolygonCoordinates.length > 0 && (
                <Polyline
                    positions={newPolygonCoordinates.map((coord) => [coord.lat, coord.lon])}
                    pathOptions={{ color: 'red', dashArray: '5,10' }}
                />
            )}

            {/* Object Marker */}
            {objects.map((obj) => (
                <Marker
                    key={obj.id}
                    position={[obj.lat, obj.lon]}
                    eventHandlers={{ click: () => onObjectClick(obj) }}
                >
                    <Popup>{obj.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapPanel;