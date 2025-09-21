import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { LatLng, ObjectMarker, Polygon } from '../types/types';
import MapPanel from './map/MapPanel';
import SideBar from './SideBar';

const PanelsContainer = () => {
    const [polygons, setPolygons] = useState<Polygon[]>([]);
    const [objects, setObjects] = useState<ObjectMarker[]>([]);
    const [drawingMode, setDrawingMode] = useState<'polygon' | 'marker' | 'none'>('none');
    const [currentDrawing, setCurrentDrawing] = useState<LatLng[]>([]);
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
            setNewName('');
        } else if (drawingMode === 'polygon') {
            setCurrentDrawing((prev) => [...prev, latlng]);
        }
    };

    // סיום פוליגון
    const handleFinishPolygon = () => {
        if (currentDrawing.length > 2) {
            const newPolygon: Polygon = {
                id: uuidv4(),
                name: newName || `Polygon ${polygons.length + 1}`,
                coordinates: currentDrawing,
            };
            setPolygons([...polygons, newPolygon]);
        }
        setCurrentDrawing([]);
        setDrawingMode('none');
        setNewName('');
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
                currentDrawing={currentDrawing} 
            />

            <SideBar
                setDrawingMode={setDrawingMode}
                handleFinishPolygon={handleFinishPolygon}
                drawingMode={drawingMode}
            />

            <div className="side-bar" style={{ width: '25rem', padding: '20px' }}>
                <input
                    type="text"
                    placeholder="Enter name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    style={{ width: '100%', marginBottom: '10px', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
                />

                <button onClick={() => setDrawingMode('polygon')} style={{ marginBottom: '8px' }}>
                    Start Drawing Polygon
                </button>
                <button onClick={handleFinishPolygon} disabled={drawingMode !== 'polygon'} style={{ marginBottom: '8px' }}>
                    Finish Polygon
                </button>
                <button onClick={() => setDrawingMode('marker')}>Add Marker</button>
            </div>
        </div>
    );
}   

export default PanelsContainer;


