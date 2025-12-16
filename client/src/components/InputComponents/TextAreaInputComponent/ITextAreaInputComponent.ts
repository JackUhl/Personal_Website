import { ChangeEvent } from "react";

export default interface ITextAreaInputComponent {
    label?: string;
    value?: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}