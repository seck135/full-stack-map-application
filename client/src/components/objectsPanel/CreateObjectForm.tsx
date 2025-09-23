import { Popover, Select } from "antd";
import { useDispatch } from "react-redux";
import { setDrawingMode } from "../../store/draftCoordinatesSlice";
import { IconNamesEnum, type IconNamesEnumKey } from "../enums/customSymbolsEnum";

const { Option } = Select;


interface ICreateObjectFormProps {
    newObjectName: string
    setNewObjectName: (value: React.SetStateAction<string>) => void
    selectedIcon: IconNamesEnumKey
    setSelectedIcon: (value: React.SetStateAction<IconNamesEnumKey>) => void
    isNewObjectNameEmpty: boolean
    isThereCoordinate: boolean
    handleCreateObjectMarker: () => void
}

const CreateObjectForm = ({
    newObjectName,
    setNewObjectName,
    selectedIcon,
    setSelectedIcon,
    isNewObjectNameEmpty,
    isThereCoordinate,
    handleCreateObjectMarker
}: ICreateObjectFormProps) => {
    const dispatch = useDispatch()

    return (
        <div className="create-form">
            <input
                type="text"
                placeholder="הזן שם אובייקט"
                value={newObjectName}
                onChange={(e) => setNewObjectName(e.target.value)}
                className="create-form__input"
            />
            <Popover
                content={isNewObjectNameEmpty ? "😕 נא להזין שם אובייקט" : "😊 מוכן לסימון קורדינטה"}
                trigger="hover"
                placement="top"
            >
                <button
                    disabled={isNewObjectNameEmpty}
                    className="create-form__btn create-form__mark-coordinates-btn"
                    onClick={() => dispatch(setDrawingMode('marker'))}
                >
                    סמן אובייקט
                </button>
            </Popover>
            <Popover
                content={"😊 אייקון לבחירה"}
                trigger="hover"
                placement="top"
            >
                <Select
                    title="בחר אייקון"
                    value={selectedIcon}
                    className='create-form__btn create-form__select-marker-icon'
                    onChange={(val: IconNamesEnumKey) => setSelectedIcon(val)}
                >
                    {Object.entries(IconNamesEnum).map(([key, hebrew]) => (
                        <Option key={key} value={key}
                            className={"create-form__btn create-form__select-marker-icon--option"}
                        >
                            {hebrew}
                        </Option>
                    ))}
                </Select>

            </Popover>

            <Popover
                content={
                    (!isThereCoordinate)
                        ? "😕 נא לסמן אובייקט"
                        : isNewObjectNameEmpty
                            ? "😕 נא להזין שם אובייקט"
                            : "😊 הכל מוכן לשמירה"
                }
                trigger="hover"
                placement="top"
            >
                <button
                    disabled={!isThereCoordinate || isNewObjectNameEmpty}
                    className="create-form__btn create-form__save-btn"
                    onClick={handleCreateObjectMarker}
                >
                    שמור חדש
                </button>
            </Popover>
        </div>
    )
}
export default CreateObjectForm;