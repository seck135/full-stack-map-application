import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCreatePolygon, usePolygons } from '../api/queries/polygons';
import type { Coordinate, IPolygonCreate, ObjectMarker } from '../types/types';
import MapPanel from './map/MapPanel';
import SideBar from './SideBar';

const PanelsContainer = () => {
    const { data: polygons, isLoading, error } = usePolygons();
    const createPolygon = useCreatePolygon();

    const [objects, setObjects] = useState<ObjectMarker[]>([]);
    const [drawingMode, setDrawingMode] = useState<'polygon' | 'marker' | 'none'>('none');
    const [newPolygonCoordinates, setNewPolygonCoordinates] = useState<Coordinate[]>([]);
    const [newName, setNewName] = useState<string>(''); // שם חדש לפוליגון/אובייקט

    // לחיצה במפה
    const handleMapClick = (coordinate: Coordinate) => {
        console.log("handleMapClick");

        if (drawingMode === 'marker') {
            const newMarker: ObjectMarker = {
                id: uuidv4(),
                name: newName || `Object ${objects.length + 1}`,
                coordinate: coordinate,
            };
            setObjects([...objects, newMarker]);
            setDrawingMode('none');
            // setNewName('');
        } else if (drawingMode === 'polygon') {
            setNewPolygonCoordinates((prev) => [...prev, coordinate]);
        }
    };

    // סיום פוליגון
    const handleFinishPolygon = (polygonName: string) => {
        const newPolygon: IPolygonCreate = {
            name: polygonName,
            coordinates: newPolygonCoordinates,
        };

        createPolygon.mutate(
            newPolygon,
            {
                onSuccess: (data) => {
                    console.log("Polygon created:", data); // runs after success
                    // You can reset form or show a message
                    setNewPolygonCoordinates([]);
                    setDrawingMode('none');
                },
                onError: (err) => {
                    console.error("Failed to create polygon:", err);
                },
            }
        );
    };

    return (
        <div className='panels-container'>
            <MapPanel
                polygons={drawingMode !== 'none' ? [] : polygons ?? []}
                objects={drawingMode !== 'none' ? [] : objects ?? []}
                onPolygonClick={(polygon) => console.log('Polygon clicked:', polygon)}
                onObjectClick={(object) => console.log('Object clicked:', object)}
                onMapClick={handleMapClick}
                drawingMode={drawingMode}
                newPolygonCoordinates={newPolygonCoordinates}
            />

            <SideBar
                setDrawingMode={setDrawingMode}
                handleFinishPolygon={handleFinishPolygon}
                newPolygonCoordinates={newPolygonCoordinates}
            />
        </div>
    );
}

export default PanelsContainer;


