import { ChangeEvent } from "react";
import { IEditFormComponent } from "./IEditFormComponent";
import { InputType } from "../../models/enums/InputType";
import TextInputComponent from "../InputComponents/TextInputComponent/TextInputComponent";
import TextAreaInputComponent from "../InputComponents/TextAreaInputComponent/TextAreaInputComponent";
import DateInputComponent from "../InputComponents/DateInputComponent/DateInputComponent";
import { closeIconSpacing, labelStyle, svgIcon } from "./EditFormComponent.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import { alignItemsCenter, flexColumn, flexGrow, flexRow, fullWidth, icon, justifyContentCenter, spacing } from "../../styling/shared.module.css";
import OnClickButtonComponent from "../OnClickButtonComponent/OnButtonButtonComponent";
import closeSvg from "../../assets/svg/close.svg";
import plusSvg from "../../assets/svg/plus.svg"
import FileUploadComponent from "../FileUploadComponent/FileUploadComponent";
import HrefButtonComponent from "../HrefButtonComponent/HrefButtonComponent";
import { UploadService } from "../../services/UploadService";

export default function EditFormComponent<T>(props: IEditFormComponent<T>) {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, propertyName: keyof T, fieldArrayValueIndex?: number) => {
        const updatedForm = { ...props.formValues };
        const value = event.target.value;

        if (fieldArrayValueIndex != undefined) {
            const field = updatedForm[propertyName] as string[];
            field[fieldArrayValueIndex] = value;
        } else {
            (updatedForm[propertyName] as string) = value;
        }

        props.onChange(updatedForm);
    }

    const handleFileUpload = (url: string, propertyName: string & keyof T, fieldArrayValueIndex?: number) => {
        const updatedForm = { ...props.formValues };

        if (fieldArrayValueIndex != undefined) {
            const field = updatedForm[propertyName] as string[];
            field[fieldArrayValueIndex] = url;
        } else {
            (updatedForm[propertyName] as string) = url;
        }

        props.onChange(updatedForm);
    }

    const handleArrayInputDelete = (propertyName: string & keyof T, fieldArrayValueIndex: number) => {
        const updatedForm = { ...props.formValues };
        (updatedForm[propertyName] as string[]).splice(fieldArrayValueIndex, 1);
        props.onChange(updatedForm);
    }

    const handleArrayInputAdd = (propertyName: string & keyof T) => {
        const updatedForm = { ...props.formValues };
        (updatedForm[propertyName] as string[]).push("");
        props.onChange(updatedForm);
    }

    const inputTypeSwitcher = (value: string, propertyName: string & keyof T, type: InputType, fieldArrayValueIndex?: number, label?: string) => {
        if (type == InputType.Text) {
            return (
                <TextInputComponent
                    label={label}
                    value={value}
                    onChange={(event) => handleInputChange(event, propertyName, fieldArrayValueIndex)}
                />
            )
        }
        else if (type == InputType.TextArea) {
            return (
                <TextAreaInputComponent
                    label={label}
                    value={value}
                    onChange={(event) => handleInputChange(event, propertyName, fieldArrayValueIndex)}
                />
            )
        }
        else if (type == InputType.Date) {
            return (
                <DateInputComponent
                    label={label}
                    value={value}
                    onChange={(event) => handleInputChange(event, propertyName, fieldArrayValueIndex)}
                />
            )
        }
        else if (type == InputType.SvgFile) {
            return (
                <>
                    <FileUploadComponent
                        fileExtension="image/svg+xml"
                        onUpload={(url) => handleFileUpload(url, propertyName)}
                        label={label}
                        value={value}
                        onChange={(event) => handleInputChange(event, propertyName, fieldArrayValueIndex)}
                    />
                    <div className={classNameJoin([flexRow, justifyContentCenter, alignItemsCenter])}>
                        <img
                            src={UploadService.GetFile(value)}
                            className={svgIcon}
                        />
                    </div>
                </>
            )
        }
        else if (type == InputType.PdfFile) {
            return (
                <>
                    <FileUploadComponent
                        fileExtension="application/pdf"
                        onUpload={(url) => handleFileUpload(url, propertyName, fieldArrayValueIndex)}
                        label={label}
                        value={value}
                        onChange={(event) => handleInputChange(event, propertyName, fieldArrayValueIndex)}
                    />
                    <div className={classNameJoin([flexRow, justifyContentCenter, alignItemsCenter])}>
                        <HrefButtonComponent
                            href={UploadService.GetFile(value)}
                            openInNewTab={true}
                        >
                            <p>View PDF</p>
                        </HrefButtonComponent>
                    </div>
                </>
            )
        }
        else {
            return (
                <>
                    <FileUploadComponent
                        fileExtension="image/png,image/jpeg,image/gif"
                        onUpload={(url) => handleFileUpload(url, propertyName, fieldArrayValueIndex)}
                        label={label}
                        value={value}
                        onChange={(event) => handleInputChange(event, propertyName, fieldArrayValueIndex)}
                    />
                    <img
                        src={UploadService.GetFile(value)}
                        className={fullWidth}
                    />
                </>
            )
        }
    }

    return (
        <div
            className={classNameJoin([flexColumn, fullWidth, spacing])}
        >
            {props.fields.map((field, fieldIndex) => (
                <div
                    key={fieldIndex}
                    className={classNameJoin([flexGrow, fieldIndex != props.fields.length - 1 ? spacing : ""])}
                >
                    {Array.isArray(props.formValues[field.propertyName]) ?
                        (
                            <>
                                <p className={labelStyle}>{field.label}</p>
                                {(props.formValues[field.propertyName] as string[]).map((fieldArrayValue, fieldArrayValueIndex) => (
                                    <div
                                        key={fieldArrayValueIndex}
                                        className={classNameJoin([flexRow, alignItemsCenter, spacing])}
                                    >
                                        {inputTypeSwitcher(fieldArrayValue, field.propertyName, field.type, fieldArrayValueIndex, undefined)}
                                        <div className={closeIconSpacing}>
                                            <OnClickButtonComponent
                                                onClick={() => handleArrayInputDelete(field.propertyName, fieldArrayValueIndex)}
                                            >
                                                <div className={classNameJoin([flexRow])}>
                                                    <img src={closeSvg} className={icon} />
                                                </div>
                                            </OnClickButtonComponent>
                                        </div>
                                    </div>
                                ))}
                                <div className={classNameJoin([flexRow, justifyContentCenter, alignItemsCenter])}>
                                    <OnClickButtonComponent
                                        onClick={() => handleArrayInputAdd(field.propertyName)}
                                    >
                                        <div className={classNameJoin([flexRow])}>
                                            <img src={plusSvg} className={icon} />
                                        </div>
                                    </OnClickButtonComponent>
                                </div>
                            </>
                        ) : (
                            inputTypeSwitcher(props.formValues[field.propertyName] as string, field.propertyName, field.type, undefined, field.label)
                        )}
                </div>
            ))}
        </div>
    )
}