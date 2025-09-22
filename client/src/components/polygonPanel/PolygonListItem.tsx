import { useState } from "react";
import type { Polygon } from "../../types/types";
import classNames from "classnames";
import { useDeletePolygon } from "../../api/queries/polygons";

interface PolygonListItemProps {
    polygon: Polygon
    isPolygonToEdit: boolean
    setDrawingMode: React.Dispatch<React.SetStateAction<"polygon" | "marker" | "none">>
    handleSaveEditedPolygon: ({ newNameToUpdate }: { newNameToUpdate: string; }) => void
    setPolygonToEdit: React.Dispatch<React.SetStateAction<Polygon | null>>
}

const PolygonListItem = ({ polygon, isPolygonToEdit, setDrawingMode, handleSaveEditedPolygon, setPolygonToEdit }: PolygonListItemProps) => {
    const deletePolygon = useDeletePolygon();

    const [editedPoltgonName, setEditedPolygonName] = useState(polygon.name);

    return (
        <li key={polygon.id} className="polygon-list-item">
            {
                isPolygonToEdit ?
                    <input
                        type="read"
                        placeholder="הזן שם פוליגון"
                        value={editedPoltgonName}
                        onChange={(e) => setEditedPolygonName(e.target.value)}
                        className="polygon-list-item--input"
                    />
                    : <span className="polygon-list-item--name">{polygon.name}</span>
            }
            <button
                className={classNames("polygon-list-item__update-coordinates-btn",
                    isPolygonToEdit ? "polygon-list-item__update-coordinates-btn--active"
                        : "polygon-list-item__update-coordinates-btn--disabled")}
                onClick={() => setDrawingMode('polygon')}
            >
                {"לחץ כדי לעדכן קורדינטות"}
            </button>
            <div className="polygon-list-item__actions">
                <button
                    className="polygon-list-item__actions__btn polygon-list-item__actions__edit-btn"
                    onClick={() =>
                        isPolygonToEdit
                            ? handleSaveEditedPolygon({ newNameToUpdate: editedPoltgonName })
                            : setPolygonToEdit(polygon)}
                >
                    {isPolygonToEdit ? "שמור" : "ערוך"}
                </button>
                <button
                    onClick={() => deletePolygon.mutate(polygon.id)}
                    disabled={deletePolygon.isPending}
                    className="polygon-list-item__actions__btn polygon-list-item__actions__delete-btn">
                    {deletePolygon.isPending ? "מוחק..." : "מחק"}
                </button>
            </div>
        </li>
    )
}

export default PolygonListItem;