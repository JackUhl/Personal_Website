import { ChangeEvent } from "react";
import { IEditFormComponent } from "./IEditFormComponent";
import { InputType } from "../../models/enums/InputType";
import TextInputComponent from "../InputComponents/TextInputComponent/TextInputComponent";
import TextAreaInputComponent from "../InputComponents/TextAreaInputComponent/TextAreaInputComponent";
import DateInputComponent from "../InputComponents/DateInputComponent/DateInputComponent";
import { closeIconSpacing, labelStyle, svgIcon, uploadButton } from "./EditFormComponent.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import { alignItemsCenter, columnGap, flexColumn, flexGrow, flexRow, fullWidth, icon, justifyContentCenter, spacing } from "../../styling/shared.module.css";
import OnClickButtonComponent from "../OnClickButtonComponent/OnButtonButtonComponent";
import closeSvg from "../../assets/svg/close.svg";
import plusSvg from "../../assets/svg/plus.svg"
import { createPdfUrl, encodePdf, encodeSvg } from "../../utilities/helpers/Encoding";
import FileUploadComponent from "../FileUploadComponent/FileUploadComponent";
import HrefButtonComponent from "../HrefButtonComponent/HrefButtonComponent";

export default function EditFormComponent<T>(props: IEditFormComponent<T>) {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, propertyName: keyof T, fieldArrayValueIndex?: number) => {
        const updatedForm = {...props.formValues};
        const value = event.target.value;

        if (fieldArrayValueIndex != undefined) {
            const field = updatedForm[propertyName] as string[];
            field[fieldArrayValueIndex] = value;
        } else {
            (updatedForm[propertyName] as string) = value;
        }

        props.onChange(updatedForm);
    }

    const handleSvgChange = (event: ChangeEvent<HTMLInputElement>, propertyName: string & keyof T, fieldArrayValueIndex?: number) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const fileReader = new FileReader();

            fileReader.onload = (progressEvent) => {
                const updatedForm = {...props.formValues};
                const value = progressEvent.target?.result?.toString() ?? "";

                if (fieldArrayValueIndex != undefined) {
                    const field = updatedForm[propertyName] as string[];
                    field[fieldArrayValueIndex] = value;
                } else {
                    (updatedForm[propertyName] as string) = value;
                }

                props.onChange(updatedForm);
            }

            fileReader.readAsText(file);
        }
    }

    const handlePdfChange = (event: ChangeEvent<HTMLInputElement>, propertyName: string & keyof T, fieldArrayValueIndex?: number) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const fileReader = new FileReader();

            fileReader.onload = (progressEvent) => {
                const updatedForm = {...props.formValues};
                const value = progressEvent.target?.result?.toString() ?? "";
                const base64Content = encodePdf(value);

                if (fieldArrayValueIndex != undefined) {
                    const field = updatedForm[propertyName] as string[];
                    field[fieldArrayValueIndex] = base64Content;
                } else {
                    (updatedForm[propertyName] as string) = base64Content;
                }

                props.onChange(updatedForm);
            }

            fileReader.readAsDataURL(file);
        }
    }

    const handleArrayInputDelete = (propertyName: string & keyof T, fieldArrayValueIndex: number) => {
        const updatedForm = {...props.formValues};
        (updatedForm[propertyName] as string[]).splice(fieldArrayValueIndex, 1);
        props.onChange(updatedForm);
    }

    const handleArrayInputAdd = (propertyName: string & keyof T) => {
        const updatedForm = {...props.formValues};
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
                <FileUploadComponent
                    onChange={(event) => handleSvgChange(event, propertyName)}
                    fileExtension=".svg"
                >
                    <img
                        src={encodeSvg(value)}
                        className={svgIcon}
                    />
                </FileUploadComponent>
            )
        }
        else if (type == InputType.PdfFile) {
            return (
                <div className={classNameJoin([flexRow, justifyContentCenter, alignItemsCenter, columnGap])}>
                    <HrefButtonComponent
                        href={createPdfUrl(value)}
                        openInNewTab={true}
                    >
                        <p>View PDF</p>
                    </HrefButtonComponent>
                    <FileUploadComponent
                        fileExtension=".pdf"
                        onChange={(event) => handlePdfChange(event, propertyName, fieldArrayValueIndex)}
                    >
                        <p className={uploadButton}>Upload</p>
                    </FileUploadComponent>
                </div>
            )
        }
        else {
            return (
                <>
                    <TextInputComponent
                        label={label}
                        value={value}
                        onChange={(event) => handleInputChange(event, propertyName, fieldArrayValueIndex)}
                    />
                    <img
                        src={value}
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