import { ChangeEvent } from "react";

export default interface ITextInputComponent {
    label?: string;
    required: boolean;
    value?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}