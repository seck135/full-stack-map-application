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
        <div className="management-panel__controls">
            <span className='management-panel__controls--description'>צור אובייקט חדש :</span>
            <input
                type="text"
                placeholder="הזן שם אובייקט"
                value={newObjectName}
                onChange={(e) => setNewObjectName(e.target.value)}
                className="management-panel__controls__input"
            />
            <Popover
                content={isNewObjectNameEmpty ? "😕 נא להזין שם אובייקט" : "😊 מוכן לסימון קורדינטה"}
                trigger="hover"
                placement="top"
            >
                <button
                    disabled={isNewObjectNameEmpty}
                    className="management-panel__controls__btn management-panel__controls__mark-coordinates-btn"
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
                    className='management-panel__controls__btn management-panel__controls__select-marker-icon'
                    onChange={(val: IconNamesEnumKey) => setSelectedIcon(val)}
                >
                    {Object.entries(IconNamesEnum).map(([key, hebrew]) => (
                        <Option key={key} value={key}
                            className={"management-panel__controls__btn management-panel__controls__select-marker-icon--option"}
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
                    className="management-panel__controls__btn management-panel__controls__create-btn"
                    onClick={handleCreateObjectMarker}
                >
                    שמור
                </button>
            </Popover>
        </div>
    )
}
export default CreateObjectForm;