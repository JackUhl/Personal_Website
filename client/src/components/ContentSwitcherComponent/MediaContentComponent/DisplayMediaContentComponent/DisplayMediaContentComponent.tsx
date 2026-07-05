import WindowComponent from "../../../../components/WindowComponent/WindowComponent";
import { useIsMobile } from "../../../../hooks/useIsMobile/useIsMobile";
import { UploadService } from "../../../../services/UploadService/UploadService";
import { fullWidth } from "../../../../styling/shared.module.css";
import { desktopMediaContentContainer, mobileMediaContentContainer, subText } from "./DisplayMediaContentComponent.module.css";
import IDisplayMediaContentComponent from "./IDisplayMediaContentComponent";

export default function DisplayMediaContentComponent(props: IDisplayMediaContentComponent) {
    const isMobile = useIsMobile();

    return (
        <div className={isMobile ? mobileMediaContentContainer : desktopMediaContentContainer}>
            <WindowComponent title={"Media Viewer"}>
                <img src={UploadService.GetFile(props.media)} className={fullWidth} />
            </WindowComponent>
            {props.subText && <p className={subText} data-testid="media-content-subtext">{props.subText}</p>}
        </div>
    )
}