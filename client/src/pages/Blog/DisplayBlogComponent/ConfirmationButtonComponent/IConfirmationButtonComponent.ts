import { PropsWithChildren } from "react";

export interface IConfirmationButtonComponent extends PropsWithChildren {
    onClick: () => void;
}