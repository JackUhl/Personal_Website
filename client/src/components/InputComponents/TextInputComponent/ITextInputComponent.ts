import { ChangeEvent } from "react";

export default interface ITextInputComponent {
    label?: string;
    value?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}