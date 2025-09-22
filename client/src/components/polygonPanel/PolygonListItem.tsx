import classNames from "classnames";
import { useState } from "react";
import { useDeletePolygon } from "../../api/queries/polygons";
import type { Polygon } from "../../types/types";
import PolygonEditSaveButton from "./PolygonEditSaveButton";
import { useDispatch } from "react-redux";
import { setDrawingMode } from "../../store/draftCoordinatesSlice";

interface PolygonListItemProps {
    polygon: Polygon
    isPolygonToEdit: boolean
    handleSaveEditedPolygon: ({ newNameToUpdate }: { newNameToUpdate: string; }) => void
    setPolygonToEdit: React.Dispatch<React.SetStateAction<Polygon | null>>
    isThereCoordinates: boolean
}

const PolygonListItem = ({ polygon, isPolygonToEdit, handleSaveEditedPolygon, setPolygonToEdit, isThereCoordinates }: PolygonListItemProps) => {
    const dispatch = useDispatch()
    const deletePolygon = useDeletePolygon();

    const [editedPoltgonName, setEditedPolygonName] = useState(polygon.name);

    const isNewPolygonNameEmpty = editedPoltgonName.trim().length === 0;

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
                onClick={() => dispatch(setDrawingMode('polygon'))}
            >
                {"לחץ כדי לעדכן קורדינטות"}
            </button>
            <div className="list-item__actions">
                <PolygonEditSaveButton
                    isPolygonToEdit={isPolygonToEdit}
                    isThereCoordinates={isThereCoordinates}
                    isNewPolygonNameEmpty={isNewPolygonNameEmpty}
                    handleSaveEditedPolygon={handleSaveEditedPolygon}
                    setPolygonToEdit={setPolygonToEdit}
                    polygon={polygon}
                    editedPoltgonName={editedPoltgonName}
                />
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