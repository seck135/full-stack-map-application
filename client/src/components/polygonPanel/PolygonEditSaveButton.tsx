import classNames from "classnames";
import type { Polygon } from "../../types/types";
import { Popover } from "antd";

interface PolygonEditSaveButtonProps {
    isPolygonToEdit: boolean
    isThereCoordinates: boolean
    isNewPolygonNameEmpty: boolean
    handleSaveEditedPolygon: ({ newNameToUpdate }: { newNameToUpdate: string; }) => void
    setPolygonToEdit: React.Dispatch<React.SetStateAction<Polygon | null>>
    polygon: Polygon
    editedPoltgonName: string
}

const PolygonEditSaveButton = ({
    isPolygonToEdit,
    isThereCoordinates,
    isNewPolygonNameEmpty,
    handleSaveEditedPolygon,
    setPolygonToEdit,
    polygon,
    editedPoltgonName
}: PolygonEditSaveButtonProps) => {

    const saveOrEditButton = (
        <button
            className={classNames("save-edit-button",
                isPolygonToEdit ? "save-edit-button--save" : "save-edit-button--edit"
            )}
            disabled={isPolygonToEdit && (!isThereCoordinates || isNewPolygonNameEmpty)}
            onClick={() =>
                isPolygonToEdit
                    ? handleSaveEditedPolygon({ newNameToUpdate: editedPoltgonName })
                    : setPolygonToEdit(polygon)}
        >
            {isPolygonToEdit ? "שמור" : "ערוך"}
        </button>
    )

    return (
        <>
            {isPolygonToEdit ? (
                <Popover
                    content={
                        !isThereCoordinates
                            ? "😕 נא לסמן לפחות 3 קורדינטות"
                            : isNewPolygonNameEmpty
                                ? "😕 נא להזין שם פוליגון"
                                : "😊 הכל מוכן לשמירה"
                    }
                    trigger="hover"
                    placement="left"
                >
                    {saveOrEditButton}
                </Popover>
            ) : (
                saveOrEditButton
            )}
        </>
    )

}

export default PolygonEditSaveButton;