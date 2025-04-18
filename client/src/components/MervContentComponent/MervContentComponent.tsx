import { useContext } from "react";
import TerminalComponent from "../TerminalComponent/TerminalComponent";
import IMervContentComponent from "./IMervContentComponent";
import { desktopMervContentContainer, mobileMervContentContainer } from "./MervContentComponent.module.css";
import { IsMobileContext } from "../../contexts/IsMobileContext";

export default function MervContentComponent(props: IMervContentComponent) {
    const isMobile = useContext(IsMobileContext);
    
    return (
        <div className={isMobile ? mobileMervContentContainer : desktopMervContentContainer}>
            <TerminalComponent {...props} path={props.path ?? "MERV"}/>
        </div>
    )
}