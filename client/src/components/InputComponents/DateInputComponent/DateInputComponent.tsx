import { useState } from "react";
import { IDateInputComponent } from "./IDateInputComponent";
import { dateInputBox } from "./DateInputComponent.module.css";
import BaseInputComponent from "../BaseInputComponent/BaseInputComponent";

export default function DateInputComponent(props: IDateInputComponent) {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.trim() === "" && props.required) {
            setErrorMessage("This field is required.");
        }
        else {
            setErrorMessage(undefined);
        }

        props.onChange(event);
    }

    const getDateInputValue = (date: Date) => {
        return date.toISOString().split('T')[0];
    }

    return (
        <BaseInputComponent
            label={props.label}
            required={props.required}
            inputElement={
                <input
                    type="date"
                    value={props.value ? getDateInputValue(new Date(props.value)) : ""}
                    className={dateInputBox}
                    onChange={handleOnChange}
                />
            }
            errorMessage={errorMessage}
        />
    )
}