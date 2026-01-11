import IDisplayTextContentComponent from "./IDisplayTextContentComponent";
import { textContent } from "./DisplayTextContentComponent.module.css";

export default function DisplayTextContentComponent(props: IDisplayTextContentComponent) {
    return (
        <div className={textContent} dangerouslySetInnerHTML={{__html: props.content}} />
    )
}