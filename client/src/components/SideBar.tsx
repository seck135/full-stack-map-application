import type { IObjectCreate, IPolygonCreate } from "../types/types";
import MapTablePanel from "./mapTablePanel/MapTablePanel";
import ObjectPanel from "./objectsPanel/ObjectPanel";
import type { Mode } from "./PanelsContainer";
import PolygonPanel from "./polygonPanel/PolygonPanel";

interface SideBarProps {
    handleSavePolygon: ({ polygonToSave, mode }: { polygonToSave: IPolygonCreate; mode: Mode; }) => void
    handleSaveObjectMarker: ({ objectToSave, mode }: { objectToSave: IObjectCreate; mode: Mode; }) => void
}

const SideBar = ({ handleSavePolygon, handleSaveObjectMarker  }: SideBarProps) => {

    return (
        <div className="side-bar" >
            <PolygonPanel handleSavePolygon={handleSavePolygon}  />
            <ObjectPanel handleSaveObjectMarker={handleSaveObjectMarker} />
            <MapTablePanel />
        </div>
    )
}

export default SideBar;