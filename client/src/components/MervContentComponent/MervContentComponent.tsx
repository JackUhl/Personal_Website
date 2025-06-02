import TerminalComponent from "../TerminalComponent/TerminalComponent";
import IMervContentComponent from "./IMervContentComponent";
import { desktopMervContentContainer, mobileMervContentContainer } from "./MervContentComponent.module.css";
import { useIsMobile } from "../../hooks/useIsMobile";

export default function MervContentComponent(props: IMervContentComponent) {
    const isMobile = useIsMobile();
    
    return (
        <div className={isMobile ? mobileMervContentContainer : desktopMervContentContainer}>
            <TerminalComponent {...props} path={props.path ?? "MERV"}/>
        </div>
    )
}