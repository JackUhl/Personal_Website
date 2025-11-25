import { ReactElement } from "react";

export default interface IOnClickButtonComponent {
    buttonElement: ReactElement;
    onClick: () => void;
}