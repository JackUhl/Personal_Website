import { useIsMobile } from "../../../hooks/useIsMobile";
import WindowComponent from "../../../components/WindowComponent/WindowComponent";
import IMediaContentComponent from "./IMediaContentComponent";
import { mediaScale, subText } from "./MediaContentComponent.module.css";

export default function MediaContentComponent(props: IMediaContentComponent) {   
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