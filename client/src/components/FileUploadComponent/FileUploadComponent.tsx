import { useRef } from "react";
import IFileUploadComponent from "./IFileUploadComponent";
import { hidden, uploadButton } from "./FileUploadComponent.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import { alignItemsCenter, columnGap, flexRow, justifyContentCenter, spacing } from "../../styling/shared.module.css";
import { UploadService } from "../../services/UploadService";
import TextInputComponent from "../InputComponents/TextInputComponent/TextInputComponent";

export default function FileUploadComponent(props: IFileUploadComponent) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const response = await UploadService.PostUpload(file);
            props.onUpload(response.data);
        }
    }

    const handleOnClick = () => {
        inputRef.current?.click();
    }

    return (
        <div
            className={classNameJoin([flexRow, justifyContentCenter, alignItemsCenter, columnGap, spacing])}
        >
            <TextInputComponent
                label={props.label}
                value={props.value}
                onChange={props.onChange}
            />
            <p
                onClick={handleOnClick}
                className={uploadButton}
            >
                Upload
            </p>
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