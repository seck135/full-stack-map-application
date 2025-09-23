import { useDispatch, useSelector } from 'react-redux';
import { useCreateObject, useObjects, useUpdateObject } from '../api/queries/objects';
import { useCreatePolygon, usePolygons, useUpdatePolygon } from '../api/queries/polygons';
import type { RootState } from '../store';
import { addPolygonDraftCoordinate, setDrawingMode, setObjectDraftCoordinate } from '../store/draftCoordinatesSlice';
import type { Coordinate, IObjectCreate, IPolygonCreate } from '../types/types';
import MapPanel from './map/MapPanel';
import SideBar from './SideBar';

export type Mode =
    | { type: "create" }
    | { type: "update"; id: string };

const PanelsContainer = () => {
    const dispatch = useDispatch()

    const { data: polygons } = usePolygons();
    const { data: objects } = useObjects();
    const createPolygon = useCreatePolygon();
    const updatePolygon = useUpdatePolygon();
    const createObject = useCreateObject();
    const updateObject = useUpdateObject();

    const { drawingMode, polygonDraftCoordinates, objectDraftCoordinate } = useSelector((state: RootState) => state.draftCoordinates);

    // Click on map handler
    const handleMapClick = (coordinate: Coordinate) => {
        if (drawingMode === 'marker') {
            dispatch(setObjectDraftCoordinate(coordinate));
        } else if (drawingMode === 'polygon') {
            dispatch(addPolygonDraftCoordinate(coordinate))
        }
    };

    const handleSavePolygon = ({ polygonToSave, mode }: { polygonToSave: IPolygonCreate, mode: Mode }) => {
        if (mode.type === "create") {
            createPolygon.mutate(polygonToSave, {
                onSuccess: (data) => {
                    console.log("Polygon created:", data);
                    dispatch(setDrawingMode("none"))
                },
                onError: (err) => console.error("Failed to create polygon:", err),
            });
        } else if (mode.type === "update") {
            updatePolygon.mutate(
                { id: mode.id, polygon: polygonToSave },
                {
                    onSuccess: (data) => {
                        console.log("Polygon updated:", data);
                        dispatch(setDrawingMode('none'))
                    },
                    onError: (err) => console.error("Failed to update polygon:", err),
                }
            );
        }
    };

    const handleSaveObjectMarker = ({ objectToSave, mode }: { objectToSave: IObjectCreate, mode: Mode }) => {
        if (mode.type === "create") {
            createObject.mutate(objectToSave, {
                onSuccess: (data) => {
                    console.log("Object created:", data);
                    dispatch(setDrawingMode('none'))
                },
                onError: (err) => console.error("Failed to create object:", err),
            });
        } else if (mode.type === "update") {
            updateObject.mutate(
                { id: mode.id, objectMarker: objectToSave },
                {
                    onSuccess: (data) => {
                        console.log("Object updated:", data);
                        dispatch(setDrawingMode('none'))
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
                onMapClick={handleMapClick}
                drawingMode={drawingMode}
                editedPointsToDisplay={[
                    ...polygonDraftCoordinates,
                    ...(objectDraftCoordinate ? [objectDraftCoordinate] : [])
                ]}
            />

            <SideBar
                handleSavePolygon={handleSavePolygon}
                handleSaveObjectMarker={handleSaveObjectMarker}
            />
        </div>
    );
}

export default PanelsContainer;


