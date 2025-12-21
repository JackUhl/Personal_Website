import { ChangeEvent } from "react";
import { AddableType, IEditForm } from "./IEditForm";
import { InputType } from "../../models/enums/InputType";
import TextInputComponent from "../InputComponents/TextInputComponent/TextInputComponent";
import TextAreaInputComponent from "../InputComponents/TextAreaInputComponent/TextAreaInputComponent";
import DateInputComponent from "../InputComponents/DateInputComponent/DateInputComponent";
import { border, icon, spacing } from "./EditForm.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import { alignItemsCenter, flexColumn, flexGrow, flexRow, fullWidth, justifyContentCenter, justifyContentEnd } from "../../styling/shared.module.css";
import OnClickButtonComponent from "../OnClickButtonComponent/OnButtonButtonComponent";
import closeSvg from "../../assets/svg/close.svg";
import plusSvg from "../../assets/svg/plus.svg"

export default function EditForm<T>(props: IEditForm<T[]>) {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, propertyName: string, index: number) => {
        const updatedForm = [...props.forms];
        const item = { ...(updatedForm[index] as any) };
        item[propertyName] = event.target.value;
        updatedForm[index] = item as T;
        props.onChange(updatedForm);
    }

    const handleFormDelete = (index: number) => {
        const updatedForm = [...props.forms];
        updatedForm.splice(index, 1);
        props.onChange(updatedForm);
    }

    const handleFormAdd = (addType: AddableType) => {
        const updatedForm = [...props.forms];
        const emptyItem = {} as T

        if (addType == AddableType.unshift) {
            updatedForm.unshift(emptyItem);
        }
        else {
            updatedForm.push(emptyItem);
        }

        props.onChange(updatedForm);
    }

    const inputTypeSwitcher = (value: string, propertyName: string, type: InputType, index: number, label?: string) => {
        if (type == InputType.Text) {
            return (
                <TextInputComponent
                    label={label}
                    value={value}
                    onChange={(event) => handleInputChange(event, propertyName, index)}
                />
            )
        }
        else if (type == InputType.TextArea) {
            return (
                <TextAreaInputComponent
                    label={label}
                    value={value}
                    onChange={(event) => handleInputChange(event, propertyName, index)}
                />
            )
        }
        else if (type == InputType.Date) {
            return (
                <DateInputComponent
                    label={label}
                    value={value}
                    onChange={(event) => handleInputChange(event, propertyName, index)}
                />
            )
        }
    }

    return (
        <>
            {props.addable == AddableType.unshift &&
                <div
                    className={classNameJoin([flexRow, justifyContentCenter, alignItemsCenter, spacing])}
                >
                    <OnClickButtonComponent
                        buttonElement={
                            <div className={classNameJoin([flexRow, alignItemsCenter])}>
                                <img src={plusSvg} className={icon} />
                            </div>
                        }
                        onClick={() => handleFormAdd(AddableType.unshift)}
                    />
                </div>
            }
            {props.forms.map((form, formIndex) => (
                <div
                    key={formIndex}
                    className={classNameJoin([flexColumn, fullWidth, border, spacing])}
                >
                    <div className={classNameJoin([flexRow, justifyContentEnd])}>
                        <OnClickButtonComponent
                            buttonElement={
                                <div className={classNameJoin([flexRow])}>
                                    <img src={closeSvg} className={icon} />
                                </div>
                            }
                            onClick={() => handleFormDelete(formIndex)}
                        />
                    </div>
                    {props.fields.map((field, fieldIndex) => (
                        <div
                            key={fieldIndex}
                            className={classNameJoin([flexGrow, spacing])}
                        >
                            {inputTypeSwitcher(form[field.propertyName as keyof T] as string, field.propertyName, field.type, formIndex, field.label)}
                        </div>
                    ))}
                </div>
            ))}
        </>
    )
}