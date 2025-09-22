import { Popover } from 'antd';
import { useState } from 'react';
import { useDeletePolygon, usePolygons } from '../../api/queries/polygons';
import type { Coordinate } from '../../types/types';


interface PolygonPanelProps {
    setDrawingMode: React.Dispatch<React.SetStateAction<"polygon" | "marker" | "none">>
    handleFinishPolygon: (polygonName: string) => void
    newPolygonCoordinates: Coordinate[]
}

const PolygonPanel = ({ setDrawingMode, handleFinishPolygon, newPolygonCoordinates }: PolygonPanelProps) => {
    const { data: polygons } = usePolygons();
    
    const deletePolygon = useDeletePolygon();
    const [newPolygonName, setNewPolygonName] = useState('');

    const isNewPolygonNameEmpty = newPolygonName.trim().length === 0;
    const isThereCoordinates = newPolygonCoordinates.length > 2;

    const handleSavePolygon = () => {
        handleFinishPolygon(newPolygonName);
        setNewPolygonName('');
    }

    return (
        <div className="polygon-panel">
            <h2 className="polygon-panel--title">ניהול פוליגונים 🗺️</h2>

            <div className="polygon-panel__controls">
                <span className='polygon-panel__controls--description'>צור פוליגון חדש :</span>
                <input
                    type="text"
                    placeholder="הזן שם פוליגון"
                    value={newPolygonName}
                    onChange={(e) => setNewPolygonName(e.target.value)}
                    className="polygon-panel__controls__input"
                />
                <Popover
                    content={isNewPolygonNameEmpty ? "😕 נא להזין שם פוליגון" : "😊 מוכן לסימון קורדינטות"}
                    trigger="hover"
                    placement="top"
                >
                    <span>
                        <button
                            disabled={isNewPolygonNameEmpty}
                            className="polygon-panel__controls__btn polygon-panel__controls__mark-coordinates-btn"
                            onClick={() => setDrawingMode('polygon')}
                        >
                            סמן פוליגון
                        </button>
                    </span>
                </Popover>

                <Popover
                    content={!isThereCoordinates ? "😕 נא לסמן פוליגון" : "😊 הכל מוכן לשמירה"}
                    trigger="hover"
                    placement="top"
                >
                    <span>
                        <button
                            disabled={!isThereCoordinates}
                            className="polygon-panel__controls__btn polygon-panel__controls__create-btn"
                            onClick={handleSavePolygon}
                        >
                            שמור
                        </button>
                    </span>
                </Popover>



            </div>

            <ul className="polygon-panel__polygon-list">
                {(polygons ?? []).map(polygon => (
                    <li key={polygon.id} className="polygon-panel__polygon-list__item">
                        <span className="polygon-panel__polygon-list__item--name">{polygon.name}</span>
                        <div className="polygon-panel__polygon-list__item__actions">
                            <button className="polygon-panel__polygon-list__item__actions__btn polygon-panel__polygon-list__item__actions__edit-btn">ערוך</button>
                            <button onClick={() => deletePolygon.mutate(polygon.id)}
                            className="polygon-panel__polygon-list__item__actions__btn polygon-panel__polygon-list__item__actions__delete-btn">מחק</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PolygonPanel;