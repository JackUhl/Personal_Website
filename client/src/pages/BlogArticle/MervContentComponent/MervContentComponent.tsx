import TerminalComponent from "../../../components/TerminalComponent/TerminalComponent";
import { useIsMobile } from "../../../hooks/useIsMobile";
import IMervContentComponent from "./IMervContentComponent";
import { desktopMervContentContainer, mobileMervContentContainer } from "./MervContentComponent.module.css";

export default function MervContentComponent(props: IMervContentComponent) {
    const isMobile = useIsMobile();
    
    return (
        <div className={isMobile ? mobileMervContentContainer : desktopMervContentContainer}>
            <TerminalComponent {...props} path={props.path ?? "MERV"}/>
        </div>
    )
}