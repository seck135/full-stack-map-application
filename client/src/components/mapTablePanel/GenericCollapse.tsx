import { Collapse } from "antd";
import type { Coordinate } from "../../types/types";

const { Panel } = Collapse;

interface IGenericCollapse {
    collapseColumn: 'lon' | 'lat'
    itemId: string
    expandedPolygonId: string | null
    points: Coordinate[]
    handleCollapseChange: (polygonId: string, keys: string | string[]) => void
}

const GenericCollapse = ({ collapseColumn, itemId, expandedPolygonId, points, handleCollapseChange }: IGenericCollapse) => {
    return (
        <Collapse
            ghost
            activeKey={expandedPolygonId === itemId ? [itemId] : []}
            onChange={(keys) => handleCollapseChange(itemId, keys)}
        >
            <Panel header={`${points.length} נקודות`} key={itemId}>
                <ul className="points-list">
                    {points.map(([lon, lat], idx) => (
                        <li className="nowrap" key={idx}>
                            {Math.round((collapseColumn === 'lon' ? lon : lat) * 100) / 100}
                        </li>
                    ))}
                </ul>
            </Panel>
        </Collapse>
    )
}

export default GenericCollapse;