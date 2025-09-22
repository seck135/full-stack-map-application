import { useState } from "react";
import type { Polygon } from "../../types/types";
import classNames from "classnames";
import { useDeletePolygon } from "../../api/queries/polygons";
import { Popover } from "antd";

interface PolygonListItemProps {
    polygon: Polygon
    isPolygonToEdit: boolean
    setDrawingMode: React.Dispatch<React.SetStateAction<"polygon" | "marker" | "none">>
    handleSaveEditedPolygon: ({ newNameToUpdate }: { newNameToUpdate: string; }) => void
    setPolygonToEdit: React.Dispatch<React.SetStateAction<Polygon | null>>
    isThereCoordinates: boolean
}

const PolygonListItem = ({ polygon, isPolygonToEdit, setDrawingMode, handleSaveEditedPolygon, setPolygonToEdit, isThereCoordinates }: PolygonListItemProps) => {
    const deletePolygon = useDeletePolygon();

    const [editedPoltgonName, setEditedPolygonName] = useState(polygon.name);

    const isNewPolygonNameEmpty = editedPoltgonName.trim().length === 0;

    if(isPolygonToEdit ) {
        console.log(!isThereCoordinates || isNewPolygonNameEmpty);
        
    }

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
                <Popover
                    content={
                        (!isThereCoordinates)
                            ? "😕 נא לסמן לפחות 3 קורדינטות"
                            : isNewPolygonNameEmpty
                                ? "😕 נא להזין שם פוליגון"
                                : "😊 הכל מוכן לשמירה"
                    }
                    trigger="hover"
                    placement="left"
                >
                    <button
                        className={classNames("list-item__actions__btn",
                            isPolygonToEdit ? "list-item__actions__btn--save" : "list-item__actions__btn--edit"
                        )}
                        disabled={isPolygonToEdit && (!isThereCoordinates || isNewPolygonNameEmpty)}
                        onClick={() =>
                            isPolygonToEdit
                                ? handleSaveEditedPolygon({ newNameToUpdate: editedPoltgonName })
                                : setPolygonToEdit(polygon)}
                    >
                        {isPolygonToEdit ? "שמור" : "ערוך"}
                    </button>
                </Popover>
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