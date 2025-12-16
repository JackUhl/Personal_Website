import { classNameJoin } from "../../../utilities/helpers/ClassnameJoiner";
import ITextInputComponent from "./ITextInputComponent";
import { textInputBox } from "./TextInputComponent.module.css";
import { flexGrow } from "../../../styling/shared.module.css";
import BaseInputComponent from "../BaseInputComponent/BaseInputComponent";

export default function TextInputComponent(props: ITextInputComponent) {
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(event);
    }

    return (
        <BaseInputComponent
            label={props.label}
            inputElement={
                <input
                    type="text"
                    value={props.value}
                    className={classNameJoin([textInputBox, flexGrow])}
                    onChange={handleOnChange}
                />
            }
        />
    )
}