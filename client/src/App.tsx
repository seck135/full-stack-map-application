// App.tsx
import React, { useState } from 'react';
import MapPanel from './components/map/MapPanel';
import type { Polygon, ObjectMarker, LatLng } from './types/types';
import { v4 as uuidv4 } from 'uuid'; // Don't forget to install uuid: npm install uuid @types/uuid

const App: React.FC = () => {
    const [polygons, setPolygons] = useState<Polygon[]>([]);
    const [objects, setObjects] = useState<ObjectMarker[]>([]);
    const [drawingMode, setDrawingMode] = useState<'polygon' | 'marker' | 'none'>('none');
    const [currentDrawing, setCurrentDrawing] = useState<LatLng[]>([]);

    const handleMapClick = (latlng: LatLng) => {
        if (drawingMode === 'marker') {
            const newMarker: ObjectMarker = {
                id: uuidv4(),
                name: `Object ${objects.length + 1}`,
                coordinate: latlng,
            };
            setObjects([...objects, newMarker]);
            setDrawingMode('none'); // Exit drawing mode after placing marker
        }
        if (drawingMode === 'polygon') {
            setCurrentDrawing((prev) => [...prev, latlng]);
            // This is just for adding points. You'll need a button to "finish" the polygon.
        }
    };

    const handleFinishPolygon = () => {
        if (currentDrawing.length > 2) {
            const newPolygon: Polygon = {
                id: uuidv4(),
                name: `Polygon ${polygons.length + 1}`,
                coordinates: currentDrawing,
            };
            setPolygons([...polygons, newPolygon]);
        }
        setCurrentDrawing([]);
        setDrawingMode('none');
    };

    const handlePolygonClick = (polygon: Polygon) => {
        console.log('Polygon clicked:', polygon.name);
        // Implement logic to edit polygon here, e.g., show a popup with options.
    };

    const handleObjectClick = (object: ObjectMarker) => {
        console.log('Object clicked:', object.name);
        // Implement logic to edit object here.
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ flex: 1 }}>
                <MapPanel
                    polygons={polygons}
                    objects={objects}
                    onPolygonClick={handlePolygonClick}
                    onObjectClick={handleObjectClick}
                    onMapClick={handleMapClick}
                    drawingMode={drawingMode}
                />
            </div>
            {/* These are placeholder buttons for demonstration. In your actual UI, they will be in the control panels */}
            <div style={{ width: '30%', padding: '20px' }}>
                <button onClick={() => setDrawingMode('polygon')}>Start Drawing Polygon</button>
                <button onClick={handleFinishPolygon} disabled={drawingMode !== 'polygon'}>
                    Finish Polygon
                </button>
                <button onClick={() => setDrawingMode('marker')}>Add Marker</button>
            </div>
        </div>
    );
};

export default App;