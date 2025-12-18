import { ChangeEvent } from "react";
import { Field, IEditForm } from "./IEditForm";
import { InputType } from "../../models/enums/InputType";
import TextInputComponent from "../InputComponents/TextInputComponent/TextInputComponent";
import TextAreaInputComponent from "../InputComponents/TextAreaInputComponent/TextAreaInputComponent";
import DateInputComponent from "../InputComponents/DateInputComponent/DateInputComponent";
import { border, icon, spacing } from "./EditForm.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import { flexColumn, flexGrow, flexRow, fullWidth, justifyContentEnd } from "../../styling/shared.module.css";
import OnClickButtonComponent from "../OnClickButtonComponent/OnButtonButtonComponent";
import closeSvg from "../../assets/svg/close.svg";

export default function EditForm<T>(props: IEditForm<T>) {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>, propertyName: string) => {
        props.handleChangeForm({
            ...props.formValue,
            [propertyName]: event.target.value
        })
    }

    const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>, propertyName: string) => {
        props.handleChangeForm({
            ...props.formValue,
            [propertyName]: event.target.value
        })
    }

    const inputTypeSwitcher = (field: Field) => {
        if (field.type == InputType.Text) {
            return (
                <TextInputComponent
                    label={field.label}
                    value={field.value as string}
                    onChange={(event) => handleInputChange(event, field.propertyName)}
                />
            )
        }
        else if (field.type == InputType.TextArea) {
            return (
                <TextAreaInputComponent
                    label={field.label}
                    value={field.value as string}
                    onChange={(event) => handleTextAreaChange(event, field.propertyName)}
                />
            )
        }
        else {
            return (
                <DateInputComponent
                    label={field.label}
                    value={field.value as string}
                    onChange={(event) => handleInputChange(event, field.propertyName)}
                />
            )
        }
    }

    return (
        <div
            className={classNameJoin([flexColumn, fullWidth, border, spacing])}
        >
            <div className={classNameJoin([flexRow, justifyContentEnd])}>
                <OnClickButtonComponent
                    buttonElement={
                        <div className={classNameJoin([flexRow])}>
                            <img src={closeSvg} className={icon} />
                        </div>
                    }
                    onClick={() => props.handleDeleteForm()}
                />
            </div>
            {props.fields.map((field, index) => (
                <div
                    key={index}
                    className={classNameJoin([flexGrow, spacing])}
                >
                    { inputTypeSwitcher(field) }
                </div>
            ))}
        </div>
    )
}