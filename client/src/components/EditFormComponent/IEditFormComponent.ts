import { InputType } from "../../models/enums/InputType"

export type Field<T> = {
    label?: string
    propertyName: string & keyof T,
    type: InputType,
}

export interface IEditFormComponent<T> {
    fields: Field<T>[];
    formValues: T;
    onChange: (updatedValues: T) => void;
}