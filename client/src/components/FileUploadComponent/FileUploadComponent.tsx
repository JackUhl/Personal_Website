import { useRef } from "react";
import IFileUploadComponent from "./IFileUploadComponent";
import { hidden } from "./FileUploadComponent.module.css";

export default function FileUploadComponent(props: IFileUploadComponent) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(event);
    }

    const handleOnClick = () => {
        inputRef.current?.click();
    }

    return (
        <>
            <div
                onClick={handleOnClick}
            >
                {props.children}
            </div>
            <input
                ref={inputRef}
                type="file"
                accept={props.fileExtension}
                onChange={handleOnChange}
                className={hidden}
            />
        </>
    )
}