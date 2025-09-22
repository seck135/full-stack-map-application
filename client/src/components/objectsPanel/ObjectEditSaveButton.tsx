import { Popover } from "antd";
import classNames from "classnames";
import type { ObjectMarker } from "../../types/types";

interface PolygonEditSaveButtonProps {
    isObjectToEdit: boolean
    isNewPolygonNameEmpty: boolean
    handleSaveEditedObject: ({ newNameToUpdate }: { newNameToUpdate: string; }) => void
    setObjectMarkerToEdit: React.Dispatch<React.SetStateAction<ObjectMarker | null>>
    objectMarker: ObjectMarker
    editedObjectName: string
}

const PolygonEditSaveButton = ({
    isObjectToEdit,
    isNewPolygonNameEmpty,
    handleSaveEditedObject,
    setObjectMarkerToEdit,
    objectMarker,
    editedObjectName
}: PolygonEditSaveButtonProps) => {

    const saveOrEditButton = (
        <button
            className={classNames("list-item__actions__btn",
                isObjectToEdit ? "list-item__actions__btn--save" : "list-item__actions__btn--edit"
            )}
            disabled={isObjectToEdit && isNewPolygonNameEmpty}
            onClick={() =>
                isObjectToEdit
                    ? handleSaveEditedObject({ newNameToUpdate: editedObjectName })
                    : setObjectMarkerToEdit(objectMarker)}
        >
            {isObjectToEdit ? "שמור" : "ערוך"}
        </button>
    )

    return (
        <>
            {isObjectToEdit ? (
                <Popover
                    content={
                        isNewPolygonNameEmpty
                            ? "😕 נא להזין שם פוליגון"
                            : "😊 הכל מוכן לשמירה"
                    }
                    trigger="hover"
                    placement="left"
                >
                    {saveOrEditButton}
                </Popover >
            ) : (
                saveOrEditButton
            )}
        </>
    )

}

export default PolygonEditSaveButton;