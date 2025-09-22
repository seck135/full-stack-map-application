import type { Coordinate, Polygon } from "../types/types"
import PolygonPanel from "./polygonPanel/PolygonPanel"

interface SideBarProps {
    setDrawingMode: React.Dispatch<React.SetStateAction<"polygon" | "marker" | "none">>
    handleFinishPolygon: (polygonName: string) => void
    polygons: Polygon[]
    newPolygonCoordinates: Coordinate[]
}

const SideBar = ({ setDrawingMode, handleFinishPolygon, polygons, newPolygonCoordinates }: SideBarProps) => {
    return (
        <div className="side-bar" >
            <PolygonPanel
                handleFinishPolygon={handleFinishPolygon}
                setDrawingMode={setDrawingMode}
                polygons={polygons}
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