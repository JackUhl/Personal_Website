import { baseInputLabel, error, required } from "./BaseInputComponent.module.css";
import IBaseInputComponent from "./IBaseInputComponent";

export default function BaseInputComponent (props: IBaseInputComponent) {
    return (
        <div>
            {props.label && <p className={baseInputLabel}>{props.label}{props.required && <span className={required}> *</span>}</p>}
            {props.inputElement}
            {props.errorMessage && <p className={error}>{props.errorMessage}</p>}
        </div>
    )
}