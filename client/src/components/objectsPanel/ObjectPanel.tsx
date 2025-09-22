import { Popover } from 'antd';
import { useState } from 'react';
import { usePolygons } from '../../api/queries/polygons';
import type { Coordinate, Polygon } from '../../types/types';
import ObjectListItem from './ObjectListItem';


interface PolygonPanelProps {
    setDrawingMode: React.Dispatch<React.SetStateAction<"polygon" | "marker" | "none">>
    newPolygonCoordinates: Coordinate[]
}

const ObjectPanel = ({ setDrawingMode }: PolygonPanelProps) => {
    const { data: polygons } = usePolygons();

    const [newPolygonName, setNewPolygonName] = useState('');
    const [polygonToEdit, setPolygonToEdit] = useState<Polygon | null>(null);

    return (
        <div className="polygon-panel">
            <h2 className="polygon-panel--title">ניהול אובייקטים 🗺️</h2>

            <div className="polygon-panel__controls">
                <span className='polygon-panel__controls--description'>צור אובייקט חדש :</span>
                <input
                    type="text"
                    placeholder="הזן שם אובייקט"
                    value={newPolygonName}
                    onChange={(e) => setNewPolygonName(e.target.value)}
                    className="polygon-panel__controls__input"
                />
                <Popover
                    content={true ? "😕 נא להזין שם אובייקט" : "😊 מוכן לסימון קורדינטה"}
                    trigger="hover"
                    placement="top"
                >
                    <span>
                        <button
                            disabled={false}
                            className="polygon-panel__controls__btn polygon-panel__controls__mark-coordinates-btn"
                            onClick={() => setDrawingMode('marker')}
                        >
                            סמן אובייקט
                        </button>
                    </span>
                </Popover>

                <Popover
                    content={(false) ? "😕 נא לסמן אובייקט" : "😊 הכל מוכן לשמירה"}
                    trigger="hover"
                    placement="top"
                >
                    <span>
                        <button
                            disabled={false}
                            className="polygon-panel__controls__btn polygon-panel__controls__create-btn"
                        // onClick={handleCreatePolygon}
                        >
                            שמור
                        </button>
                    </span>
                </Popover>

            </div>

            <ul className="polygon-panel__polygon-list">
                {(polygons?.reverse() ?? []).map(polygon => {
                    const isPolygonToEdit = polygonToEdit?.id === polygon.id;
                    return (
                        <ObjectListItem
                            polygon={polygon}
                            isPolygonToEdit={isPolygonToEdit}
                            setDrawingMode={setDrawingMode}
                            handleSaveEditedPolygon={() => console.log("")}
                            setPolygonToEdit={setPolygonToEdit}
                        />
                    )
                })}
            </ul>
        </div>
    );
};

export default ObjectPanel;