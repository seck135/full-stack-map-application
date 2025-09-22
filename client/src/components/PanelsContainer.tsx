import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCreatePolygon, usePolygons, useUpdatePolygon } from '../api/queries/polygons';
import type { Coordinate, IPolygonCreate, ObjectMarker } from '../types/types';
import MapPanel from './map/MapPanel';
import SideBar from './SideBar';

export type Mode =
    | { type: "create" }
    | { type: "update"; id: string };

const PanelsContainer = () => {
    const { data: polygons, isLoading, error } = usePolygons();
    const createPolygon = useCreatePolygon();
    const updatePolygon = useUpdatePolygon();

    const [objects, setObjects] = useState<ObjectMarker[]>([]);
    const [drawingMode, setDrawingMode] = useState<'polygon' | 'marker' | 'none'>('none');
    const [newPolygonCoordinates, setNewPolygonCoordinates] = useState<Coordinate[]>([]);
    const [newObjectCoordinate, setNewObjectCoordinate] = useState<Coordinate | null>(null);
    console.log("newObjectCoordinate: ", newObjectCoordinate);
    
    // לחיצה במפה
    const handleMapClick = (coordinate: Coordinate) => {
        if (drawingMode === 'marker') {
            setNewObjectCoordinate(coordinate);
        } else if (drawingMode === 'polygon') {
            setNewPolygonCoordinates((prev) => [...prev, coordinate]);
        }
    };

    // סיום פוליגון
    const handleFinishPolygon = ({ polygonToSave, mode }: { polygonToSave: IPolygonCreate, mode: Mode }) => {
        const polygonData: IPolygonCreate = {
            name: polygonToSave.name,
            coordinates: polygonToSave.coordinates,
        };

        if (mode.type === "create") {
            createPolygon.mutate(polygonData, {
                onSuccess: (data) => {
                    console.log("Polygon created:", data);
                    setNewPolygonCoordinates([]);
                    setDrawingMode("none");
                },
                onError: (err) => console.error("Failed to create polygon:", err),
            });
        } else if (mode.type === "update") {
            updatePolygon.mutate(
                { id: mode.id, polygon: polygonData },
                {
                    onSuccess: (data) => {
                        console.log("Polygon updated:", data);
                        setNewPolygonCoordinates([]);
                        setDrawingMode("none");
                    },
                    onError: (err) => console.error("Failed to update polygon:", err),
                }
            );
        }
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


