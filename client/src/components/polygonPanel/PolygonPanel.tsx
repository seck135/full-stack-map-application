import React from 'react';

// Assuming these types are already defined elsewhere
// import { Polygon } from './types'; 

// This is a dummy data for the example
const dummyPolygons = [
    { id: 'poly1', name: 'פוליגון א׳' },
    { id: 'poly2', name: 'פוליגון ב׳' },
    { id: 'poly3', name: 'פוליגון ג׳' }
];

const PolygonPanel = () => {

    return (
        <div className="polygon-panel">
            <h2 className="polygon-panel--title">ניהול פוליגונים 🗺️</h2>

            <div className="polygon-panel__controls">
                <button className="polygon-panel__controls__create-btn">
                    צור פוליגון חדש
                </button>
                
            </div>

            <ul className="polygon-panel__polygon-list">
                {dummyPolygons.map(polygon => (
                    <li key={polygon.id} className="polygon-panel__polygon-list__item">
                        <span className="polygon-panel__polygon-list__item--name">{polygon.name}</span>
                        <div className="polygon-panel__polygon-list__item__actions">
                            <button className="polygon-panel__polygon-list__item__actions__edit-btn">ערוך</button>
                            <button className="polygon-panel__polygon-list__item__actions__delete-btn">מחק</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PolygonPanel;