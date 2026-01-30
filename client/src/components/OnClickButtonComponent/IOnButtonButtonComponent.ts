import { PropsWithChildren } from "react";

export default interface IOnClickButtonComponent extends PropsWithChildren {
    onClick: () => void;
    isSubmitting?: boolean;
}