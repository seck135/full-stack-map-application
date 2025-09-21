import { useState } from 'react';
import type { Polygon } from '../../types/types';
import { Popover } from 'antd';


interface PolygonPanelProps {
    setDrawingMode: React.Dispatch<React.SetStateAction<"polygon" | "marker" | "none">>
    handleFinishPolygon: (polygonName: string) => void
    drawingMode: "polygon" | "marker" | "none"
    polygons: Polygon[]
}

const PolygonPanel = ({ setDrawingMode, handleFinishPolygon, drawingMode, polygons }: PolygonPanelProps) => {
    const [newPolygonName, setNewPolygonName] = useState('');

    const handleSavePolygon = () => {
        handleFinishPolygon(newPolygonName);
        setNewPolygonName('');
    }

    return (
        <div className="polygon-panel">
            <h2 className="polygon-panel--title">ניהול פוליגונים 🗺️</h2>

            <div className="polygon-panel__controls">
                <input
                    type="text"
                    placeholder="הזן שם פוליגון"
                    value={newPolygonName}
                    onChange={(e) => setNewPolygonName(e.target.value)}
                    className="polygon-panel__controls__input"
                />
                <button
                    className='polygon-panel__controls__btn polygon-panel__controls__mark-coordinates-btn'
                    onClick={() => setDrawingMode('polygon')}>
                    סמן פוליגון
                </button>
                <Popover
                    content="! חייב להזין שם פוליגון"
                    trigger="hover"
                    placement="top"
                    open={newPolygonName.trim().length === 0 ? undefined : false}
                >
                    <button
                        className="polygon-panel__controls__btn polygon-panel__controls__create-btn"
                        onClick={handleSavePolygon}
                        disabled={newPolygonName.trim().length === 0} // אופציונלי, אם תרצה לחסום לחיצה
                    >
                        שמור
                    </button>
                </Popover>
            </div>

            <ul className="polygon-panel__polygon-list">
                {polygons.map(polygon => (
                    <li key={polygon.id} className="polygon-panel__polygon-list__item">
                        <span className="polygon-panel__polygon-list__item--name">{polygon.name}</span>
                        <div className="polygon-panel__polygon-list__item__actions">
                            <button className="polygon-panel__polygon-list__item__actions__btn polygon-panel__polygon-list__item__actions__edit-btn">ערוך</button>
                            <button className="polygon-panel__polygon-list__item__actions__btn polygon-panel__polygon-list__item__actions__delete-btn">מחק</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PolygonPanel;