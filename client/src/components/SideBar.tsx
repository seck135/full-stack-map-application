import type { IObjectCreate, IPolygonCreate } from "../types/types";
import ObjectPanel from "./objectsPanel/ObjectPanel";
import type { Mode } from "./PanelsContainer";
import PolygonPanel from "./polygonPanel/PolygonPanel";

interface SideBarProps {
    // setDrawingMode: React.Dispatch<React.SetStateAction<"polygon" | "marker" | "none">>
    handleSavePolygon: ({ polygonToSave, mode }: { polygonToSave: IPolygonCreate; mode: Mode; }) => void
    handleSaveObjectMarker: ({ objectToSave, mode }: { objectToSave: IObjectCreate; mode: Mode; }) => void
    // polygonDraftCoordinates: Coordinate[]
    // objectDraftCoordinate: Coordinate | null
}

const SideBar = ({ handleSavePolygon, handleSaveObjectMarker  }: SideBarProps) => {

    return (
        <div className="side-bar" >
            <PolygonPanel
                handleSavePolygon={handleSavePolygon}
                // setDrawingMode={setDrawingMode}
                // polygonDraftCoordinates={polygonDraftCoordinates}
            />
            <ObjectPanel
                handleSaveObjectMarker={handleSaveObjectMarker}
                // setDrawingMode={setDrawingMode}
                // objectDraftCoordinate={objectDraftCoordinate}
            />
            {/* <button onClick={() => setDrawingMode('polygon')}>Start Drawing Polygon</button> */}
            {/* <button onClick={handleFinishPolygon} disabled={drawingMode !== 'polygon'}>
                Finish Polygon
            </button> */}

            {/* <button onClick={() => setDrawingMode('marker')}>Add Marker</button> */}
        </div>
    )
}

export default SideBar;