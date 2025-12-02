import { useState } from "react";
import { IDateInputComponent } from "./IDateInputComponent";
import { dateInputBox, dateInputLabel, error, required } from "./DateInputComponent.module.css";

export default function DateInputComponent(props: IDateInputComponent) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value.trim() === "" && props.required) {
            setErrorMessage("This field is required.");
        }
        else {
            setErrorMessage(null);
        }

        props.onChange(event);
    }

    const getDateInputValue = (date: Date) => {
        return date.toISOString().split('T')[0];
    }

    return (
        <div>
            {props.label && <p className={dateInputLabel}>{props.label}{props.required && <span className={required}> *</span>}</p>}
            <input
                type="date"
                value={props.value ? getDateInputValue(new Date(props.value)) : ""}
                className={dateInputBox}
                onChange={handleOnChange}
            />
            {errorMessage && <p className={error}>{errorMessage}</p>}
        </div>
    )
}