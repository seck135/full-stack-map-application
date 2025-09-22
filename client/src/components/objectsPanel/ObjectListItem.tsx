import classNames from "classnames";
import { useState } from "react";
import type { ObjectMarker } from "../../types/types";
import { useDeleteObject } from "../../api/queries/objects";

interface ObjectListItemProps {
    objectMarker: ObjectMarker
    isObjectToEdit: boolean
    setDrawingMode: React.Dispatch<React.SetStateAction<"polygon" | "marker" | "none">>
    handleSaveEditedObject: ({ newNameToUpdate }: { newNameToUpdate: string; }) => void
    setObjectMarkerToEdit: React.Dispatch<React.SetStateAction<ObjectMarker | null>>
}

const ObjectListItem = ({ objectMarker, isObjectToEdit, setDrawingMode, handleSaveEditedObject, setObjectMarkerToEdit }: ObjectListItemProps) => {
    const deleteObjectMarker = useDeleteObject();

    const [editedObjectName, setEditedObjectName] = useState(objectMarker.name);

    return (
        <li key={objectMarker.id} className="list-item">
            {
                isObjectToEdit ?
                    <input
                        type="read"
                        placeholder="הזן שם אובייקט"
                        value={editedObjectName}
                        onChange={(e) => setEditedObjectName(e.target.value)}
                        className="list-item--input"
                    />
                    : <span className="list-item--name">{objectMarker.name}</span>
            }
            <button
                className={classNames("list-item__update-coordinates-btn",
                    isObjectToEdit
                        ? "list-item__update-coordinates-btn--pressable"
                        : "list-item__update-coordinates-btn--disabled"
                )}
                onClick={() => setDrawingMode('marker')}
            >
                {"לחץ כדי לעדכן מיקום"}
            </button>
            <div className="list-item__actions">
                <button
                    className={classNames("list-item__actions__btn",
                        isObjectToEdit ? "list-item__actions__btn--save" : "list-item__actions__btn--edit"
                    )}
                    onClick={() =>
                        isObjectToEdit
                            ? handleSaveEditedObject({ newNameToUpdate: editedObjectName })
                            : setObjectMarkerToEdit(objectMarker)}
                >
                    {isObjectToEdit ? "שמור" : "ערוך"}
                </button>
                <button
                    onClick={() => deleteObjectMarker.mutate(objectMarker.id)}
                    disabled={deleteObjectMarker.isPending}
                    className="list-item__actions__btn list-item__actions__delete-btn">
                    {deleteObjectMarker.isPending ? "מוחק..." : "מחק"}
                </button>
            </div>
        </li>
    )
}

export default ObjectListItem;