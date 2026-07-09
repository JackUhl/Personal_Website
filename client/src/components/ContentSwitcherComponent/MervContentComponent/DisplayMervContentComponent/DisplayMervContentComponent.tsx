import TerminalComponent from "../../../../components/TerminalComponent/TerminalComponent";
import { useIsMobile } from "../../../../hooks/useIsMobile/useIsMobile";
import { desktopMervContentContainer, mobileMervContentContainer } from "./DisplayMervContentComponent.module.css";
import IDisplayMervContentComponent, { IDisplayMervContentComponentKeys } from "./IDisplayMervContentComponent";

export default function DisplayMervContentComponent(props: IDisplayMervContentComponent) {
    const isMobile = useIsMobile();
    
    return (
        <div className={isMobile ? mobileMervContentContainer : desktopMervContentContainer}>
            <TerminalComponent
                text={props[IDisplayMervContentComponentKeys.Text]}
                path="MERV"
            />
        </div>
    )
}