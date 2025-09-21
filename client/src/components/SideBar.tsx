import PolygonPanel from "./polygonPanel/PolygonPanel"

interface SideBarProps {
    setDrawingMode: React.Dispatch<React.SetStateAction<"polygon" | "marker" | "none">>
    handleFinishPolygon: () => void
    drawingMode: "polygon" | "marker" | "none"
}

const SideBar = ({ setDrawingMode, handleFinishPolygon, drawingMode }: SideBarProps) => {
    return (
        <div className="side-bar" >
            <PolygonPanel />
            <button onClick={() => setDrawingMode('polygon')}>Start Drawing Polygon</button>
            <button onClick={handleFinishPolygon} disabled={drawingMode !== 'polygon'}>
                Finish Polygon
            </button>
            <button onClick={() => setDrawingMode('marker')}>Add Marker</button>
        </div>
    )
}

export default SideBar;