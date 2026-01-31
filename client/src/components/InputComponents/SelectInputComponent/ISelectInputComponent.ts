import { ChangeEvent } from "react";

export default interface ISelectInputComponent {
    label?: string;
    value?: string;
    options: string[];
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}