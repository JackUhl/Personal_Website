import { useState } from "react";
import { classNameJoin } from "../../../utilities/helpers/ClassnameJoiner";
import ITextInputComponent from "./ITextInputComponent";
import { textInputBox } from "./TextInputComponent.module.css";
import { flexGrow } from "../../../styling/shared.module.css";
import BaseInputComponent from "../BaseInputComponent/BaseInputComponent";

export default function TextInputComponent(props: ITextInputComponent) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.trim() === "" && props.required) {
            setErrorMessage("This field is required.");
        }
        else {
            setErrorMessage(null);
        }

        props.onChange(event);
    }

    return (
        <BaseInputComponent
            label={props.label}
            required={props.required}
            inputElement={
                <input
                    type="text"
                    value={props.value}
                    className={classNameJoin([textInputBox, flexGrow])}
                    onChange={handleOnChange}
                />
            }
            errorMessage={errorMessage}
        />
    )
}