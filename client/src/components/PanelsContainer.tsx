import { useState } from 'react';
import { useCreateObject, useObjects, useUpdateObject } from '../api/queries/objects';
import { useCreatePolygon, usePolygons, useUpdatePolygon } from '../api/queries/polygons';
import type { Coordinate, IObjectCreate, IPolygonCreate } from '../types/types';
import MapPanel from './map/MapPanel';
import SideBar from './SideBar';

export type Mode =
    | { type: "create" }
    | { type: "update"; id: string };

const PanelsContainer = () => {
    const { data: polygons, isLoading: polygonsIsLoading, error: polygonsError } = usePolygons();
    const { data: objects, isLoading: objectsIsLoading, error: objectsError } = useObjects();
    const createPolygon = useCreatePolygon();
    const updatePolygon = useUpdatePolygon();
    const createObject = useCreateObject();
    const updateObject = useUpdateObject();

    // const [objects, setObjects] = useState<ObjectMarker[]>([]);
    const [drawingMode, setDrawingMode] = useState<'polygon' | 'marker' | 'none'>('none');
    const [newPolygonCoordinates, setNewPolygonCoordinates] = useState<Coordinate[]>([]);
    const [newObjectCoordinate, setNewObjectCoordinate] = useState<Coordinate | null>(null);
    
    // לחיצה במפה
    const handleMapClick = (coordinate: Coordinate) => {
        if (drawingMode === 'marker') {
            setNewObjectCoordinate(coordinate);
        } else if (drawingMode === 'polygon') {
            setNewPolygonCoordinates((prev) => [...prev, coordinate]);
        }
    };

    const handleSavePolygon = ({ polygonToSave, mode }: { polygonToSave: IPolygonCreate, mode: Mode }) => {
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

    const handleSaveObjectMarker = ({ objectToSave, mode }: { objectToSave: IObjectCreate, mode: Mode }) => {
        const objectData: IObjectCreate = {
            name: objectToSave.name,
            lat: objectToSave.lat,
            lon: objectToSave.lon,
        };

        if (mode.type === "create") {
            createObject.mutate(objectData, {
                onSuccess: (data) => {
                    console.log("Object created:", data);
                    setNewObjectCoordinate(null);
                    setDrawingMode("none");
                },
                onError: (err) => console.error("Failed to create object:", err),
            });
        } else if (mode.type === "update") {
            updateObject.mutate(
                { id: mode.id, objectMarker: objectData },
                {
                    onSuccess: (data) => {
                        console.log("Object updated:", data);
                        setNewObjectCoordinate(null);
                        setDrawingMode("none");
                    },
                    onError: (err) => console.error("Failed to update object:", err),
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
                handleSavePolygon={handleSavePolygon}
                handleSaveObjectMarker={handleSaveObjectMarker}
                newPolygonCoordinates={newPolygonCoordinates}
                newObjectCoordinate={newObjectCoordinate}
            />
        </div>
    );
}

export default PanelsContainer;


