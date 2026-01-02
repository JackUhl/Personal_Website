import { ChangeEvent } from "react";
import { IEditForm } from "./IEditForm";
import { InputType } from "../../models/enums/InputType";
import TextInputComponent from "../InputComponents/TextInputComponent/TextInputComponent";
import TextAreaInputComponent from "../InputComponents/TextAreaInputComponent/TextAreaInputComponent";
import DateInputComponent from "../InputComponents/DateInputComponent/DateInputComponent";
import { closeIconSpacing, icon, labelStyle, removableFormStyle, spacing, svgIcon, uploadButton } from "./EditForm.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import { alignItemsCenter, columnGap, flexColumn, flexGrow, flexRow, fullWidth, justifyContentCenter, justifyContentEnd } from "../../styling/shared.module.css";
import OnClickButtonComponent from "../OnClickButtonComponent/OnButtonButtonComponent";
import closeSvg from "../../assets/svg/close.svg";
import plusSvg from "../../assets/svg/plus.svg"
import { AddableType } from "../../models/enums/AddableType";
import { createPdfUrl, encodePdf, encodeSvg } from "../../utilities/helpers/Encoding";
import FileUploadComponent from "../FileUploadComponent/FileUploadComponent";
import HrefButtonComponent from "../HrefButtonComponent/HrefButtonComponent";

export default function EditForm<T>(props: IEditForm<T>) {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, propertyName: string & keyof T, formIndex: number, fieldArrayValueIndex?: number) => {
        const updatedForms = [...props.forms];
        const formItem = { ...updatedForms[formIndex] } as any;
        const value = event.target.value;

        if (fieldArrayValueIndex != undefined) {
            formItem[propertyName][fieldArrayValueIndex] = value;
        } else {
            formItem[propertyName] = value;
        }

        updatedForms[formIndex] = formItem as T;
        props.onChange(updatedForms);
    }

    const handleSvgChange = (event: ChangeEvent<HTMLInputElement>, propertyName: string & keyof T, formIndex: number, fieldArrayValueIndex?: number) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const fileReader = new FileReader();

            fileReader.onload = (progressEvent) => {
                const updatedForms = [...props.forms];
                const formItem = { ...updatedForms[formIndex] } as any;
                const value = progressEvent.target?.result?.toString() ?? "";

                if (fieldArrayValueIndex != undefined) {
                    formItem[propertyName][fieldArrayValueIndex] = value;
                } else {
                    formItem[propertyName] = value;
                }

                updatedForms[formIndex] = formItem as T;
                props.onChange(updatedForms);
            }

            fileReader.readAsText(file);
        }
    }

    const handlePdfChange = (event: ChangeEvent<HTMLInputElement>, propertyName: string & keyof T, formIndex: number, fieldArrayValueIndex?: number) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const fileReader = new FileReader();

            fileReader.onload = (progressEvent) => {
                const updatedForms = [...props.forms];
                const formItem = { ...updatedForms[formIndex] } as any;
                const value = progressEvent.target?.result?.toString() ?? "";
                const base64Content = encodePdf(value);

                if (fieldArrayValueIndex != undefined) {
                    formItem[propertyName][fieldArrayValueIndex] = base64Content;
                } else {
                    formItem[propertyName] = base64Content;
                }

                updatedForms[formIndex] = formItem as T;
                props.onChange(updatedForms);
            }

            fileReader.readAsDataURL(file);
        }
    }

    const handleFormDelete = (formIndex: number) => {
        const updatedForms = [...props.forms];
        updatedForms.splice(formIndex, 1);
        props.onChange(updatedForms);
    }

    const handleArrayInputDelete = (formIndex: number, propertyName: string & keyof T, fieldArrayValueIndex: number) => {
        const updatedForms = [...props.forms];
        const formItem = { ...updatedForms[formIndex] } as T;
        (formItem[propertyName] as string[]).splice(fieldArrayValueIndex, 1);
        updatedForms[formIndex] = formItem as T;
        props.onChange(updatedForms);
    }

    const handleFormAdd = (addType: AddableType) => {
        const updatedForm = [...props.forms];
        const emptyItem = {
            ...props.defaultForm
        } as T

        if (addType == AddableType.unshift) {
            updatedForm.unshift(emptyItem);
        }
        else {
            updatedForm.push(emptyItem);
        }

        props.onChange(updatedForm);
    }

    const handleArrayInputAdd = (formIndex: number, propertyName: string & keyof T) => {
        const updatedForms = [...props.forms];
        const formItem = { ...updatedForms[formIndex] } as T;
        (formItem[propertyName] as string[]).push("");
        updatedForms[formIndex] = formItem as T;
        props.onChange(updatedForms);
    }

    const inputTypeSwitcher = (value: string, propertyName: string & keyof T, type: InputType, formIndex: number, fieldArrayValueIndex?: number, label?: string) => {
        if (type == InputType.Text) {
            return (
                <TextInputComponent
                    label={label}
                    value={value}
                    onChange={(event) => handleInputChange(event, propertyName, formIndex, fieldArrayValueIndex)}
                />
            )
        }
        else if (type == InputType.TextArea) {
            return (
                <TextAreaInputComponent
                    label={label}
                    value={value}
                    onChange={(event) => handleInputChange(event, propertyName, formIndex, fieldArrayValueIndex)}
                />
            )
        }
        else if (type == InputType.Date) {
            return (
                <DateInputComponent
                    label={label}
                    value={value}
                    onChange={(event) => handleInputChange(event, propertyName, formIndex, fieldArrayValueIndex)}
                />
            )
        }
        else if (type == InputType.SvgFile) {
            return (
                <FileUploadComponent
                    onChange={(event) => handleSvgChange(event, propertyName, formIndex)}
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
                        onChange={(event) => handlePdfChange(event, propertyName, formIndex, fieldArrayValueIndex)}
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
                        onChange={(event) => handleInputChange(event, propertyName, formIndex, fieldArrayValueIndex)}
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
        <>
            {props.addable == AddableType.unshift &&
                <div
                    className={classNameJoin([flexRow, justifyContentCenter, spacing])}
                >
                    <OnClickButtonComponent
                        onClick={() => handleFormAdd(AddableType.unshift)}
                    >
                        <div className={classNameJoin([flexRow])}>
                            <img src={plusSvg} className={icon} />
                        </div>
                    </OnClickButtonComponent>

                </div>
            }
            {props.forms.map((form, formIndex) => (
                <div
                    key={props.idPropertyName ? form[props.idPropertyName] as string : formIndex}
                    className={classNameJoin([flexColumn, fullWidth, spacing, props.removable ? removableFormStyle : ""])}
                >
                    {props.removable && <div className={classNameJoin([flexRow, justifyContentEnd])}>
                        <OnClickButtonComponent
                            onClick={() => handleFormDelete(formIndex)}
                        >
                            <div className={classNameJoin([flexRow])}>
                                <img src={closeSvg} className={icon} />
                            </div>
                        </OnClickButtonComponent>
                    </div>}
                    {props.fields.map((field, fieldIndex) => (
                        <div
                            key={fieldIndex}
                            className={classNameJoin([flexGrow, fieldIndex != props.fields.length - 1 ? spacing : ""])}
                        >
                            {Array.isArray(form[field.propertyName]) ?
                                (
                                    <>
                                        <p className={labelStyle}>{field.label}</p>
                                        {(form[field.propertyName] as string[]).map((fieldArrayValue, fieldArrayValueIndex) => (
                                            <div
                                                key={fieldArrayValueIndex}
                                                className={classNameJoin([flexRow, alignItemsCenter, spacing])}
                                            >
                                                {inputTypeSwitcher(fieldArrayValue, field.propertyName, field.type, formIndex, fieldArrayValueIndex, undefined)}
                                                <div className={closeIconSpacing}>
                                                    <OnClickButtonComponent
                                                        onClick={() => handleArrayInputDelete(formIndex, field.propertyName, fieldArrayValueIndex)}
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
                                                onClick={() => handleArrayInputAdd(formIndex, field.propertyName)}
                                            >
                                                <div className={classNameJoin([flexRow])}>
                                                    <img src={plusSvg} className={icon} />
                                                </div>
                                            </OnClickButtonComponent>
                                        </div>
                                    </>
                                ) : (
                                    inputTypeSwitcher(form[field.propertyName] as string, field.propertyName, field.type, formIndex, undefined, field.label)
                                )}
                        </div>
                    ))}
                </div>
            ))}
            {props.addable == AddableType.push &&
                <div
                    className={classNameJoin([flexRow, justifyContentCenter, spacing])}
                >
                    <OnClickButtonComponent
                        onClick={() => handleFormAdd(AddableType.push)}
                    >
                        <div className={classNameJoin([flexRow])}>
                            <img src={plusSvg} className={icon} />
                        </div>
                    </OnClickButtonComponent>
                </div>
            }
        </>
    )
}