import { type LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMemo } from 'react';
import { Polygon as LeafletPolygon, MapContainer, Marker, Polyline, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import type { Coordinate, ObjectMarker, Polygon } from '../../types/types';
import type { IconNamesEnumKey } from '../enums/customSymbolsEnum';
import { customSymbols, ICON_PX_SIZE, redIcon } from './icons';

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

const MapEventsHandler = ({ onMapClick, drawingMode }: MapEventsHandlerProps) => {
    useMapEvents({
        click(e) {
            if (drawingMode === 'marker' || drawingMode === 'polygon') {
                onMapClick([e.latlng.lng, e.latlng.lat]);
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

    const mapCenter = { lat: 31.7683, lon: 35.2137 };

    // ---- leatlet expects [lat, lon] instaed of [lon, lat]
    // Convert edited points from [lon, lat] → [ lat, lon ] 
    const swappedEditedPoints = useMemo(() => {
        return editedPointsToDisplay.map(([lon, lat]) => ([lat, lon] as LatLngTuple));
    }, [editedPointsToDisplay]);

    // Convert polygons from GeoJSON [lon, lat] → [ lat, lon ]
    const swappedPolygons = useMemo(() => {
        return polygons.map((polygon) => ({
            ...polygon,
            geometry: {
                ...polygon.geometry,
                coordinates: polygon.geometry.coordinates.map((ring) =>
                    ring.map(([lon, lat]) => ([lat, lon] as LatLngTuple))
                ),
            },
        }));
    }, [polygons]);



    return (
        <MapContainer className='map-panel' center={[mapCenter.lat, mapCenter.lon]} zoom={13}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapEventsHandler onMapClick={onMapClick} drawingMode={drawingMode} />

            {/* Mark the lines of Edited Polygon */}
            {drawingMode === 'polygon' && swappedEditedPoints.length > 0 && (
                <Polyline
                    positions={swappedEditedPoints}
                    pathOptions={{ color: 'red', dashArray: '5,10' }}
                />
            )}

            {/* Show points while drawing/editing */}
            {drawingMode !== 'none' &&
                swappedEditedPoints.map((coord, index) => (
                    <Marker
                        key={`temp-${index}`}
                        position={coord}
                        icon={redIcon}
                    >
                        <Popup>Point {index + 1}</Popup>
                    </Marker>
                ))}

            {/* Polygons */}
            {swappedPolygons.map((polygon) => (
                <LeafletPolygon
                    key={polygon.id}
                    positions={polygon.geometry.coordinates}
                    pathOptions={{ color: 'blue' }}
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
                    position={[obj.geometry.coordinates[1], obj.geometry.coordinates[0]]}
                    icon={customSymbols[obj.symbolType as keyof typeof customSymbols]}
                >
                    <Popup offset={
                        obj.symbolType === 'default' as IconNamesEnumKey
                            ? [0, 0]
                            : [0, -ICON_PX_SIZE / 2]
                    }>
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