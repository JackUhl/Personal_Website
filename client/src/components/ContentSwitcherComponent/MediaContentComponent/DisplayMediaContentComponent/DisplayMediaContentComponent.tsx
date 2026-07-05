import WindowComponent from "../../../../components/WindowComponent/WindowComponent";
import { useIsMobile } from "../../../../hooks/useIsMobile/useIsMobile";
import { UploadService } from "../../../../services/UploadService/UploadService";
import { mediaScale, subText } from "./DisplayMediaContentComponent.module.css";
import IDisplayMediaContentComponent from "./IDisplayMediaContentComponent";

export default function DisplayMediaContentComponent(props: IDisplayMediaContentComponent) {   
    const isMobile = useIsMobile();
    
    return (
        <div style={{width: isMobile ? "100%" : "75%"}}>
            <WindowComponent title={"Media Viewer"}>
                <img src={UploadService.GetFile(props.media)} className={mediaScale}/>
            </WindowComponent>
            {props.subText && <p className={subText} data-testid="media-content-subtext">{props.subText}</p>}
        </div>
    )
}