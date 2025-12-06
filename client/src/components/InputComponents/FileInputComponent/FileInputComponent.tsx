import { useRef } from "react";
import BaseInputComponent from "../BaseInputComponent/BaseInputComponent";
import IFileInputComponent from "./IFileInputComponent";
import { hidden, uploadButton } from "./FileInputComponent.module.css";

export default function FileInputComponent(props: IFileInputComponent) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(event);
    }

    const handleOnClick = () => {
        inputRef.current?.click();
    }

    return (
        <BaseInputComponent
            label={props.label}
            required={props.required}
            inputElement={
                <>
                    <p onClick={handleOnClick} className={uploadButton}>Upload</p>
                    <input
                        ref={inputRef}
                        type="file"
                        accept={props.fileExtension}
                        onChange={handleOnChange}
                        className={hidden}
                    />
                </>
            }
        />
    )
}