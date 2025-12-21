import { InputType } from "../../models/enums/InputType"

export type Field = {
    label: string,
    propertyName: string,
    type: InputType,
}

export enum AddableType {
    push,
    unshift
}

export interface IEditForm<T extends any[]> {
    fields: Field[];
    forms: T;
    addable?: AddableType;
    onChange: (updatedValues: T) => void;
}