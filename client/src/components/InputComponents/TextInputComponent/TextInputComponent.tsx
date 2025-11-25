import { useState } from "react";
import { classNameJoin } from "../../../utilities/helpers/ClassnameJoiner";
import ITextInputComponent from "./ITextInputComponent";
import { error, required, textInputBox, textInputLabel } from "./TextInputComponent.module.css";
import { flexGrow } from "../../../styling/shared.module.css";

export default function TextInputComponent(props: ITextInputComponent) {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value.trim() === "" && props.required) {
            setErrorMessage("This field is required.");
        }
        else {
            setErrorMessage(null);
        }

        props.onChange(event);
    }

    return (
        <div>
            {props.label && <p className={textInputLabel}>{props.label}{props.required && <span className={required}> *</span>}</p>}
            <input
                type="text"
                value={props.value}
                className={classNameJoin([textInputBox, flexGrow])}
                onChange={handleOnChange} 
            />
            {errorMessage && <p className={error}>{errorMessage}</p>}
        </div>
    )
}