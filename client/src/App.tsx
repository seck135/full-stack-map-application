import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MapPanel from './components/map/MapPanel';
import type { LatLng, ObjectMarker, Polygon } from './types/types';

const App = () => {
    const [polygons, setPolygons] = useState<Polygon[]>([]);
    const [objects, setObjects] = useState<ObjectMarker[]>([]);
    const [drawingMode, setDrawingMode] = useState<'polygon' | 'marker' | 'none'>('none');
    const [currentDrawing, setCurrentDrawing] = useState<LatLng[]>([]);

    // לחיצה במפה
    const handleMapClick = (latlng: LatLng) => {
        if (drawingMode === 'marker') {
            const newMarker: ObjectMarker = {
                id: uuidv4(),
                name: `Object ${objects.length + 1}`,
                coordinate: latlng,
            };
            setObjects([...objects, newMarker]);
            setDrawingMode('none');
        } else if (drawingMode === 'polygon') {
            setCurrentDrawing((prev) => [...prev, latlng]);
        }
    };

    // סיום פוליגון
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

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ flex: 1 }}>
                <MapPanel
                    polygons={polygons}
                    objects={objects}
                    onPolygonClick={(polygon) => console.log('Polygon clicked:', polygon)}
                    onObjectClick={(object) => console.log('Object clicked:', object)}
                    onMapClick={handleMapClick}
                    drawingMode={drawingMode}
                    currentDrawing={currentDrawing} // pass current drawing for live polygon
                />
            </div>
            <div style={{ width: '100rem', padding: '20px' }}>
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
