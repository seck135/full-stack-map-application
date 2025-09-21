import { useState } from 'react';
import type { LatLng, Polygon } from '../../types/types';
import { Popover } from 'antd';


interface PolygonPanelProps {
    setDrawingMode: React.Dispatch<React.SetStateAction<"polygon" | "marker" | "none">>
    handleFinishPolygon: (polygonName: string) => void
    polygons: Polygon[]
    newPolygonCoordinates: LatLng[]
}

const PolygonPanel = ({ setDrawingMode, handleFinishPolygon, polygons, newPolygonCoordinates }: PolygonPanelProps) => {
    const [newPolygonName, setNewPolygonName] = useState('');
    // const [currentDrawing, setCurrentDrawing] = useState<LatLng[]>([]);

    const isNewPolygonNameEmpty = newPolygonName.trim().length === 0;
    const isThereCoordinates = newPolygonCoordinates.length > 2;
    console.log("isNewPolygonNameEmpty", isNewPolygonNameEmpty);
    console.log("isThereCoordinates", isThereCoordinates, newPolygonCoordinates);


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
                <Popover
                    content="נא להזין שם פוליגון"
                    trigger={['hover']} // שים לב לשימוש במערך
                    placement="top"
                    open={isNewPolygonNameEmpty ? undefined : false}
                >
                    <button
                        disabled={isNewPolygonNameEmpty}
                        className={'polygon-panel__controls__btn polygon-panel__controls__mark-coordinates-btn'}
                        onClick={() => setDrawingMode('polygon')}>
                        סמן פוליגון
                    </button>
                </Popover>
                <Popover
                    content="נא לסמן פוליגון"
                    trigger={['hover']} // שים לב לשימוש במערך
                    placement="top"
                    open={!isThereCoordinates ? undefined : false}
                >
                    <button
                        disabled={!isThereCoordinates}
                        className="polygon-panel__controls__btn polygon-panel__controls__create-btn"
                        onClick={handleSavePolygon}
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