import classNames from "classnames";
import { useState } from "react";
import { useDeletePolygon } from "../../api/queries/polygons";
import type { ObjectMarker } from "../../types/types";

interface ObjectListItemProps {
    objectMarker: ObjectMarker
    isPolygonToEdit: boolean
    setDrawingMode: React.Dispatch<React.SetStateAction<"polygon" | "marker" | "none">>
    handleSaveEditedPolygon: ({ newNameToUpdate }: { newNameToUpdate: string; }) => void
    setPolygonToEdit: React.Dispatch<React.SetStateAction<ObjectMarker | null>>
}

const ObjectListItem = ({ objectMarker, isPolygonToEdit, setDrawingMode, handleSaveEditedPolygon, setPolygonToEdit }: ObjectListItemProps) => {
    const deletePolygon = useDeletePolygon();

    const [editedPoltgonName, setEditedPolygonName] = useState(objectMarker.name);

    return (
        <li key={objectMarker.id} className="polygon-list-item">
            {
                isPolygonToEdit ?
                    <input
                        type="read"
                        placeholder="הזן שם אובייקט"
                        value={editedPoltgonName}
                        onChange={(e) => setEditedPolygonName(e.target.value)}
                        className="polygon-list-item--input"
                    />
                    : <span className="polygon-list-item--name">{objectMarker.name}</span>
            }
            <button
                className={classNames("polygon-list-item__update-coordinates-btn",
                    isPolygonToEdit ? "polygon-list-item__update-coordinates-btn--active"
                        : "polygon-list-item__update-coordinates-btn--disabled")}
                onClick={() => setDrawingMode('polygon')}
            >
                {"לחץ כדי לעדכן מיקום"}
            </button>
            <div className="polygon-list-item__actions">
                <button
                    className="polygon-list-item__actions__btn polygon-list-item__actions__edit-btn"
                    onClick={() =>
                        isPolygonToEdit
                            ? handleSaveEditedPolygon({ newNameToUpdate: editedPoltgonName })
                            : setPolygonToEdit(objectMarker)}
                >
                    {isPolygonToEdit ? "שמור" : "ערוך"}
                </button>
                <button
                    onClick={() => deletePolygon.mutate(objectMarker.id)}
                    disabled={deletePolygon.isPending}
                    className="polygon-list-item__actions__btn polygon-list-item__actions__delete-btn">
                    {deletePolygon.isPending ? "מוחק..." : "מחק"}
                </button>
            </div>
        </li>
    )
}

export default ObjectListItem;