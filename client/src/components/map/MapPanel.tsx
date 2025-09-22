import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Polygon as LeafletPolygon, MapContainer, Marker, Polyline, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import type { Coordinate, ObjectMarker, Polygon } from '../../types/types';
import { greenIcon, redIcon } from './icons';

interface MapPanelProps {
    polygons: Polygon[];
    objects: ObjectMarker[];
    onMapClick: (coordinate: Coordinate) => void;
    drawingMode: 'polygon' | 'marker' | 'none';
    editedPointsToDisplay: Coordinate[];
}

type MapEventsHandlerProps = {
    onMapClick: (latlng: Coordinate) => void;
    drawingMode: 'polygon' | 'marker' | 'none';
};

// תיקון אייקון ברירת מחדל
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


const MapEventsHandler = ({ onMapClick, drawingMode }: MapEventsHandlerProps) => {
    useMapEvents({
        click(e) {
            if (drawingMode === 'marker' || drawingMode === 'polygon') {
                onMapClick({ lat: e.latlng.lat, lon: e.latlng.lng });
            }
        },
    });
    return null;
}

const MapPanel = ({
    polygons,
    objects,
    drawingMode,
    onMapClick,
    editedPointsToDisplay,
}: MapPanelProps) => {
    const mapCenter: Coordinate = { lat: 31.7683, lon: 35.2137 };

    return (
        <MapContainer className='map-panel' center={[mapCenter.lat, mapCenter.lon]} zoom={13}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapEventsHandler onMapClick={onMapClick} drawingMode={drawingMode} />

            {/* Mark the lines of Edited Polygon */}
            {drawingMode !== 'polygon' && editedPointsToDisplay.length > 0 && (
                <Polyline
                    positions={editedPointsToDisplay.map((coord) => [coord.lat, coord.lon])}
                    pathOptions={{ color: 'red', dashArray: '5,10' }}
                />
            )}

            {/* Show points while drawing/editing */}
            {drawingMode !== 'none' &&
                editedPointsToDisplay.map((coord, index) => (
                    <Marker
                        key={`temp-${index}`}
                        position={[coord.lat, coord.lon]}
                        icon={redIcon}
                    >
                        <Popup>Point {index + 1}</Popup>
                    </Marker>
                ))}

            {/* Polygons */}
            {polygons.map((polygon) => (
                <LeafletPolygon
                    key={polygon.id}
                    positions={polygon.coordinates.map((coord) => [coord.lat, coord.lon])}
                    pathOptions={{ color: 'blue' }}
                    // eventHandlers={{ click: () => onPolygonClick(polygon) }}
                >
                    <Popup>
                        <div className='map-panel--polygon-popup'>
                            {polygon.name}
                        </div>
                    </Popup>
                </LeafletPolygon>
            ))}

            {/* Objects Marker */}
            {objects.map((obj) => (
                <Marker
                    key={obj.id}
                    position={[obj.lat, obj.lon]}
                    // eventHandlers={{ click: () => onObjectClick(obj) }}
                    icon={greenIcon}
                >
                    <Popup>
                        <div className='map-panel--object-marker-popup'>
                            {obj.name}
                        </div>
                    </Popup>
                </Marker>

            ))}

        </MapContainer>
    );
};

export default MapPanel;