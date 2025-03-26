import WindowComponent from "../WindowComponent/WindowComponent";
import IMediaContentComponent from "./IMediaContentComponent";
import { mediaScale, subText } from "./MediaContentComponent.module.css";

export default function MediaContentComponent(props: IMediaContentComponent) {   
    return (
        <>
            <WindowComponent title={"Media Viewer"}>
                <img src={props.media} className={mediaScale} width={props.width ?? 400}/>
            </WindowComponent>
            {props.subText && <p className={subText}>{props.subText}</p>}
        </>
    )
}