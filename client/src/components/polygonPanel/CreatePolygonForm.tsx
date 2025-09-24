import { Popover } from "antd";
import { useDispatch } from "react-redux";
import { setDrawingMode } from "../../store/draftCoordinatesSlice";

interface ICreatePolygonFormProps {
    newPolygonName: string
    setNewPolygonName: (value: React.SetStateAction<string>) => void
    isNewPolygonNameEmpty: boolean
    isThereCoordinates: boolean
    handleCreatePolygon: () => void
}

const CreatePolygonForm = ({
    newPolygonName,
    setNewPolygonName,
    isNewPolygonNameEmpty,
    isThereCoordinates,
    handleCreatePolygon
}: ICreatePolygonFormProps) => {
    const dispatch = useDispatch()

    return (
        <div className="create-form">
            <input
                type="text"
                placeholder="הזן שם פוליגון"
                value={newPolygonName}
                onChange={(e) => setNewPolygonName(e.target.value)}
                className="create-form__input"
            />
            <Popover
                content={isNewPolygonNameEmpty ? "😕 נא להזין שם פוליגון" : "😊 מוכן לסימון קורדינטות"}
                trigger="hover"
                placement="top"
            >
                <button
                    disabled={isNewPolygonNameEmpty}
                    className="create-form__btn create-form__mark-coordinates-btn"
                    onClick={() => dispatch(setDrawingMode('polygon'))}
                >
                    לחץ לסמן פוליגון
                </button>
            </Popover>

            <Popover
                content={
                    (!isThereCoordinates)
                        ? "😕 נא לסמן לפחות 3 קורדינטות"
                        : isNewPolygonNameEmpty
                            ? "😕 נא להזין שם פוליגון"
                            : "😊 הכל מוכן לשמירה"
                }
                trigger="hover"
                placement="top"
            >
                <button
                    disabled={!isThereCoordinates || isNewPolygonNameEmpty}
                    className="create-form__btn create-form__save-btn"
                    onClick={handleCreatePolygon}
                >
                    שמור חדש
                </button>
            </Popover>

        </div>
    )

}

export default CreatePolygonForm;