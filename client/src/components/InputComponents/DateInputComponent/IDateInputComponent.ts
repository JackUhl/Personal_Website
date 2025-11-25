import { ChangeEvent } from "react";

export interface IDateInputComponent {
    label?: string;
    required: boolean;
    value?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}