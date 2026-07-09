import { flexGrow } from "../../../styling/shared.module.css";
import { classNameJoin } from "../../../utilities/helpers/ClassnameJoiner/ClassnameJoiner";
import BaseInputComponent from "../BaseInputComponent/BaseInputComponent";
import ITextInputComponent from "./ITextInputComponent";
import { textInputBox } from "./TextInputComponent.module.css";

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
                    data-testid="text-input"
                />
            }
        />
    )
}