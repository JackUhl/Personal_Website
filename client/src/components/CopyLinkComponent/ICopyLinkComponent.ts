import { PropsWithChildren } from "react";

export default interface ICopyLinkComponent extends PropsWithChildren {
    onClick: () => void;
}