import { useRef, useState } from "react";

import { UploadService } from "../../services/UploadService/UploadService";
import { alignItemsCenter, columnGap, flexRow, justifyContentCenter, spacing } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner/ClassnameJoiner";
import TextInputComponent from "../InputComponents/TextInputComponent/TextInputComponent";
import OnClickButtonComponent from "../OnClickButtonComponent/OnClickButtonComponent";
import { hidden } from "./FileUploadComponent.module.css";
import IFileUploadComponent from "./IFileUploadComponent";

export default function FileUploadComponent(props: IFileUploadComponent) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isPostLoading, setIsPostLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const isDataProcessing = isPostLoading || isDeleteLoading;

    const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setIsPostLoading(true);
            try {
                const response = await UploadService.PostFile(file);
                props.onUpload(response.data);
            } finally {
                setIsPostLoading(false);
            }
        }
    }

    const handleUploadOnClick = () => {
        inputRef.current?.click();
    }

    const handleDeleteOnClick = async () => {
        if (!props.value) {
            return;
        }

        setIsDeleteLoading(true);
        try {
            await UploadService.DeleteFile(props.value);
            props.onDelete?.();
        } finally {
            setIsDeleteLoading(false);
        }
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
            <OnClickButtonComponent
                onClick={handleUploadOnClick}
                isSubmitting={isPostLoading}
                isDisabled={isDataProcessing}
            >
                Upload
            </OnClickButtonComponent>
            <OnClickButtonComponent
                onClick={handleDeleteOnClick}
                isSubmitting={isDeleteLoading}
                isDisabled={isDataProcessing}
            >
                Delete
            </OnClickButtonComponent>
            <input
                ref={inputRef}
                type="file"
                accept={props.fileExtension}
                onChange={handleOnChange}
                className={hidden}
                data-testid="file-input"
            />
        </div>
    )
}