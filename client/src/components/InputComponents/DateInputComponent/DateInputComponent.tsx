import { IDateInputComponent } from "./IDateInputComponent";
import { dateInputBox } from "./DateInputComponent.module.css";
import BaseInputComponent from "../BaseInputComponent/BaseInputComponent";

export default function DateInputComponent(props: IDateInputComponent) {
    const getDateInputValue = (date: Date) => {
        return date.toISOString().split('T')[0];
    }

    return (
        <BaseInputComponent
            label={props.label}
            inputElement={
                <input
                    type="date"
                    value={props.value ? getDateInputValue(new Date(props.value)) : ""}
                    className={dateInputBox}
                    onChange={props.onChange}
                />
            }
        />
    )
}