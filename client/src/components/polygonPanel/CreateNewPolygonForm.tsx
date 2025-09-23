import { Popover } from "antd";
import { useDispatch } from "react-redux";
import { setDrawingMode } from "../../store/draftCoordinatesSlice";

interface ICreateNewPolygonFormProps {
    newPolygonName: string
    setNewPolygonName: (value: React.SetStateAction<string>) => void
    isNewPolygonNameEmpty: boolean
    isThereCoordinates: boolean
    handleCreatePolygon: () => void
}

const CreateNewPolygonForm = ({
    newPolygonName,
    setNewPolygonName,
    isNewPolygonNameEmpty,
    isThereCoordinates,
    handleCreatePolygon
}: ICreateNewPolygonFormProps) => {
    const dispatch = useDispatch()

    return (
        <div className="management-panel__controls">
            <span className='management-panel__controls--description'>צור פוליגון חדש :</span>
            <input
                type="text"
                placeholder="הזן שם פוליגון"
                value={newPolygonName}
                onChange={(e) => setNewPolygonName(e.target.value)}
                className="management-panel__controls__input"
            />
            <Popover
                content={isNewPolygonNameEmpty ? "😕 נא להזין שם פוליגון" : "😊 מוכן לסימון קורדינטות"}
                trigger="hover"
                placement="top"
            >
                <button
                    disabled={isNewPolygonNameEmpty}
                    className="management-panel__controls__btn management-panel__controls__mark-coordinates-btn"
                    onClick={() => dispatch(setDrawingMode('polygon'))}
                >
                    סמן פוליגון
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
                    className="management-panel__controls__btn management-panel__controls__create-btn"
                    onClick={handleCreatePolygon}
                >
                    שמור
                </button>
            </Popover>

        </div>
    )

}

export default CreateNewPolygonForm;