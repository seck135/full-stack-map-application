import classNames from "classnames";
import { useState } from "react";
import type { ObjectMarker } from "../../types/types";
import { useDeleteObject } from "../../api/queries/objects";

interface ObjectListItemProps {
    objectMarker: ObjectMarker
    isPolygonToEdit: boolean
    setDrawingMode: React.Dispatch<React.SetStateAction<"polygon" | "marker" | "none">>
    handleSaveEditedObject: ({ newNameToUpdate }: { newNameToUpdate: string; }) => void
    setObjectMarkerToEdit: React.Dispatch<React.SetStateAction<ObjectMarker | null>>
}

const ObjectListItem = ({ objectMarker, isPolygonToEdit, setDrawingMode, handleSaveEditedObject, setObjectMarkerToEdit }: ObjectListItemProps) => {
    const deleteObjectMarker = useDeleteObject();

    const [editedObjectName, setEditedObjectName] = useState(objectMarker.name);

    return (
        <li key={objectMarker.id} className="polygon-list-item">
            {
                isPolygonToEdit ?
                    <input
                        type="read"
                        placeholder="הזן שם אובייקט"
                        value={editedObjectName}
                        onChange={(e) => setEditedObjectName(e.target.value)}
                        className="polygon-list-item--input"
                    />
                    : <span className="polygon-list-item--name">{objectMarker.name}</span>
            }
            <button
                className={classNames("polygon-list-item__update-coordinates-btn",
                    isPolygonToEdit ? "polygon-list-item__update-coordinates-btn--pressable"
                        : "polygon-list-item__update-coordinates-btn--disabled")}
                onClick={() => setDrawingMode('marker')}
            >
                {"לחץ כדי לעדכן מיקום"}
            </button>
            <div className="polygon-list-item__actions">
                <button
                    className="polygon-list-item__actions__btn polygon-list-item__actions__edit-btn"
                    onClick={() =>
                        isPolygonToEdit
                            ? handleSaveEditedObject({ newNameToUpdate: editedObjectName })
                            : setObjectMarkerToEdit(objectMarker)}
                >
                    {isPolygonToEdit ? "שמור" : "ערוך"}
                </button>
                <button
                    onClick={() => deleteObjectMarker.mutate(objectMarker.id)}
                    disabled={deleteObjectMarker.isPending}
                    className="polygon-list-item__actions__btn polygon-list-item__actions__delete-btn">
                    {deleteObjectMarker.isPending ? "מוחק..." : "מחק"}
                </button>
            </div>
        </li>
    )
}

export default ObjectListItem;