import { useRef } from "react";
import IFileUploadComponent from "./IFileUploadComponent";
import { hidden } from "./FileUploadComponent.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import { alignItemsCenter, flexRow, justifyContentCenter } from "../../styling/shared.module.css";

export default function FileUploadComponent(props: IFileUploadComponent) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(event);
    }

    const handleOnClick = () => {
        inputRef.current?.click();
    }

    return (
        <div
            onClick={handleOnClick}
            className={classNameJoin([flexRow, justifyContentCenter, alignItemsCenter])}
        >
            {props.children}
            <input
                ref={inputRef}
                type="file"
                accept={props.fileExtension}
                onChange={handleOnChange}
                className={hidden}
            />
        </div>
    )
}