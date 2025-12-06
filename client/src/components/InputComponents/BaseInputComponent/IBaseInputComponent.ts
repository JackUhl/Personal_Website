import { ReactElement } from "react";

export default interface IBaseInputComponent {
    label?: string;
    required: boolean;
    inputElement: ReactElement;
    errorMessage?: string;
}