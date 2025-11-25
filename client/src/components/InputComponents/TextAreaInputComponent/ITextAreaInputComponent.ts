import { ChangeEvent } from "react";

export default interface ITextAreaInputComponent {
    label?: string;
    required: boolean;
    value?: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}