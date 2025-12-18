import { InputType } from "../../models/enums/InputType"

export type Field = {
    label: string,
    value: string | string[] | undefined,
    propertyName: string,
    type: InputType,
    isArray?: boolean,
}

export interface IEditForm<T> {
    fields: Field[];
    formValue: T;
    handleDeleteForm: () => void;
    handleChangeForm: (formValue: T) => void;
}