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
        <li key={polygon.id} className="list-item">
            {
                isPolygonToEdit ?
                    <input
                        type="read"
                        placeholder="הזן שם פוליגון"
                        value={editedPoltgonName}
                        onChange={(e) => setEditedPolygonName(e.target.value)}
                        className="list-item--input"
                    />
                    : <span className="list-item--name">{polygon.name}</span>
            }
            <button
                className={classNames("list-item__update-coordinates-btn",
                    isPolygonToEdit
                        ? "list-item__update-coordinates-btn--pressable"
                        : "list-item__update-coordinates-btn--disabled"
                )}
                onClick={() => setDrawingMode('polygon')}
            >
                {"לחץ כדי לעדכן קורדינטות"}
            </button>
            <div className="list-item__actions">
                <button
                    className={classNames("list-item__actions__btn",
                        isPolygonToEdit ? "list-item__actions__btn--save" : "list-item__actions__btn--edit"
                    )}
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
                    className="list-item__actions__btn list-item__actions__delete-btn">
                    {deletePolygon.isPending ? "מוחק..." : "מחק"}
                </button>
            </div>
        </li>
    )
}

export default PolygonListItem;