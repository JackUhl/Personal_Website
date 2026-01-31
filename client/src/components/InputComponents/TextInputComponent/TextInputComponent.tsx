import { classNameJoin } from "../../../utilities/helpers/ClassnameJoiner";
import ITextInputComponent from "./ITextInputComponent";
import { textInputBox } from "./TextInputComponent.module.css";
import { flexGrow } from "../../../styling/shared.module.css";
import BaseInputComponent from "../BaseInputComponent/BaseInputComponent";

export default function TextInputComponent(props: ITextInputComponent) {
    return (
        <BaseInputComponent
            label={props.label}
            inputElement={
                <input
                    type="text"
                    value={props.value}
                    className={classNameJoin([textInputBox, flexGrow])}
                    onChange={props.onChange}
                />
            }
        />
    )
}