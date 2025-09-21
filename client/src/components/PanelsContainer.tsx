import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { LatLng, ObjectMarker, Polygon } from '../types/types';
import MapPanel from './map/MapPanel';
import SideBar from './SideBar';

const PanelsContainer = () => {
    const [polygons, setPolygons] = useState<Polygon[]>([]);
    const [objects, setObjects] = useState<ObjectMarker[]>([]);
    const [drawingMode, setDrawingMode] = useState<'polygon' | 'marker' | 'none'>('none');
    const [newPolygonCoordinates, setNewPolygonCoordinates] = useState<LatLng[]>([]);
    const [newName, setNewName] = useState<string>(''); // שם חדש לפוליגון/אובייקט
    
    // לחיצה במפה
    const handleMapClick = (latlng: LatLng) => {
        if (drawingMode === 'marker') {
            const newMarker: ObjectMarker = {
                id: uuidv4(),
                name: newName || `Object ${objects.length + 1}`,
                coordinate: latlng,
            };
            setObjects([...objects, newMarker]);
            setDrawingMode('none');
            // setNewName('');
        } else if (drawingMode === 'polygon') {
            setNewPolygonCoordinates((prev) => [...prev, latlng]);
        }
    };

    // סיום פוליגון
    const handleFinishPolygon = (polygonName: string) => {
        if (newPolygonCoordinates.length > 2) {
            const newPolygon: Polygon = {
                id: uuidv4(),
                name: polygonName || `Polygon ${polygons.length + 1}`,
                coordinates: newPolygonCoordinates,
            };
            setPolygons([...polygons, newPolygon]);
        }
        setNewPolygonCoordinates([]);
        setDrawingMode('none');
        // setNewName('');
    };

    return (
        <div className='panels-container'>
            <MapPanel
                polygons={polygons}
                objects={objects}
                onPolygonClick={(polygon) => console.log('Polygon clicked:', polygon)}
                onObjectClick={(object) => console.log('Object clicked:', object)}
                onMapClick={handleMapClick}
                drawingMode={drawingMode}
                newPolygonCoordinates={newPolygonCoordinates}
            />

            <SideBar
                setDrawingMode={setDrawingMode}
                handleFinishPolygon={handleFinishPolygon}
                polygons={polygons}
                newPolygonCoordinates={newPolygonCoordinates}
            />

            
        </div>
    );
}   

export default PanelsContainer;


