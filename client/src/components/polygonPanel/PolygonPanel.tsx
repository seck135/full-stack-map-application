import { useState } from 'react';

// Dummy data
const dummyPolygons = [
    { id: 'poly1', name: 'פוליגון א׳' },
    { id: 'poly2', name: 'פוליגון ב׳' },
    { id: 'poly3', name: 'פוליגון ג׳' }
];

const PolygonPanel = () => {
    const [newPolygonName, setNewPolygonName] = useState('');
    const [polygons, setPolygons] = useState(dummyPolygons);

    const handleCreatePolygon = () => {
        if (!newPolygonName.trim()) return;
        const newPoly = {
            id: `poly${polygons.length + 1}`,
            name: newPolygonName
        };
        setPolygons([...polygons, newPoly]);
        setNewPolygonName('');
    };

    return (
        <div className="polygon-panel">
            <h2 className="polygon-panel--title">ניהול פוליגונים 🗺️</h2>

            <div className="polygon-panel__controls">
                <input
                    type="text"
                    placeholder="הזן שם לפוליגון"
                    value={newPolygonName}
                    onChange={(e) => setNewPolygonName(e.target.value)}
                    className="polygon-panel__controls__input"
                />
                <button
                    className='polygon-panel__controls__btn polygon-panel__controls__mark-coordinates-btn'
                    onClick={() => {
                        // setDrawingMode('polygon')
                        console.log("zibi");
                    }}>
                    סמן פוליגון
                </button>
                <button
                    className="polygon-panel__controls__btn polygon-panel__controls__create-btn"
                    onClick={handleCreatePolygon}
                >
                    שמור
                </button>
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