import { ChangeEvent } from "react";

export default interface IFileInputComponent {
    label?: string;
    required: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    fileExtension?: string;
}