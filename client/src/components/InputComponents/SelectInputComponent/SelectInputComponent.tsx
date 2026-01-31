import BaseInputComponent from "../BaseInputComponent/BaseInputComponent";
import ISelectInputComponent from "./ISelectInputComponent";
import { selectInputBox } from "./SelectInputComponent.module.css";

export default function SelectInputComponent(props: ISelectInputComponent) {
    return (
        <BaseInputComponent
            label={props.label}
            inputElement={
                <select
                    value={props.value}
                    onChange={props.onChange}
                    className={selectInputBox}
                >
                    {props.options.map((option, index) => (
                        <option 
                            key={index}
                            value={option}
                        >
                            {option}
                        </option>
                    ))}
                </select>
            }>
        </BaseInputComponent>
    )
}