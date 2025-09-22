import type { Coordinate, IPolygonCreate } from "../types/types"
import type { Mode } from "./PanelsContainer";
import PolygonPanel from "./polygonPanel/PolygonPanel"

interface SideBarProps {
    setDrawingMode: React.Dispatch<React.SetStateAction<"polygon" | "marker" | "none">>
    handleFinishPolygon: ({ polygonToSave, mode }: { polygonToSave: IPolygonCreate; mode: Mode; }) => void
    newPolygonCoordinates: Coordinate[]
}

const SideBar = ({ setDrawingMode, handleFinishPolygon, newPolygonCoordinates }: SideBarProps) => {
    return (
        <div className="side-bar" >
            <PolygonPanel
                handleFinishPolygon={handleFinishPolygon}
                setDrawingMode={setDrawingMode}
                newPolygonCoordinates={newPolygonCoordinates}
            />
            {/* <button onClick={() => setDrawingMode('polygon')}>Start Drawing Polygon</button> */}
            {/* <button onClick={handleFinishPolygon} disabled={drawingMode !== 'polygon'}>
                Finish Polygon
            </button> */}
            <button onClick={() => setDrawingMode('marker')}>Add Marker</button>
        </div>
    )
}

export default SideBar;