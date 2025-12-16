import { ChangeEvent } from "react";

export interface IDateInputComponent {
    label?: string;
    value?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}