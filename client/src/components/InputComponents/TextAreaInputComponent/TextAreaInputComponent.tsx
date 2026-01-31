import { useEffect, useRef } from "react";
import { classNameJoin } from "../../../utilities/helpers/ClassnameJoiner";
import ITextAreaInputComponent from "./ITextAreaInputComponent";
import { textAreaInputBox } from "./TextAreaInputComponent.module.css";
import { flexGrow } from "../../../styling/shared.module.css";
import BaseInputComponent from "../BaseInputComponent/BaseInputComponent";

export default function TextAreaInputComponent(props: ITextAreaInputComponent) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const setHeight = () => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
        }
    }

    useEffect(() => {
        setHeight();
    }, [])

    const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setHeight();

        props.onChange(event);
    }

    return (
        <BaseInputComponent
            label={props.label}
            inputElement={
                <textarea
                    ref={textAreaRef}
                    value={props.value}
                    className={classNameJoin([textAreaInputBox, flexGrow])}
                    onChange={handleOnChange}
                />
            }
        />
    )
}