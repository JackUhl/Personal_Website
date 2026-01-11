import { mediaScale, subText } from "./DisplayMediaContentComponent.module.css";
import { useIsMobile } from "../../../../hooks/useIsMobile";
import WindowComponent from "../../../../components/WindowComponent/WindowComponent";
import IDisplayMediaContentComponent from "./IDisplayMediaContentComponent";

export default function DisplayMediaContentComponent(props: IDisplayMediaContentComponent) {   
    const isMobile = useIsMobile();
    
    return (
        <div style={{width: isMobile ? "100%" : "75%"}}>
            <WindowComponent title={"Media Viewer"}>
                <img src={props.media} className={mediaScale}/>
            </WindowComponent>
            {props.subText && <p className={subText}>{props.subText}</p>}
        </div>
    )
}