import type { Polygon } from "../types/types"
import PolygonPanel from "./polygonPanel/PolygonPanel"

interface SideBarProps {
    setDrawingMode: React.Dispatch<React.SetStateAction<"polygon" | "marker" | "none">>
    handleFinishPolygon: (polygonName: string) => void
    drawingMode: "polygon" | "marker" | "none"
    polygons: Polygon[]
}

const SideBar = ({ setDrawingMode, handleFinishPolygon, drawingMode, polygons }: SideBarProps) => {
    return (
        <div className="side-bar" >
            <PolygonPanel
                handleFinishPolygon={handleFinishPolygon}
                drawingMode={drawingMode}
                setDrawingMode={setDrawingMode}
                polygons={polygons}
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