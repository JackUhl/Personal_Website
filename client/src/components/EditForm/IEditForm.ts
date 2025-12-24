import { AddableType } from "../../models/enums/AddableType";
import { InputType } from "../../models/enums/InputType"

export type Field<T> = {
    label?: string
    propertyName: string & keyof T,
    type: InputType,
}

export interface IEditForm<T> {
    fields: Field<T>[];
    forms: T[];
    addable?: AddableType;
    defaultForm?: T;
    removable?: boolean;
    onChange: (updatedValues: T[]) => void;
}