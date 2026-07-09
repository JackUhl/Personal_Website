import { textContent } from "./DisplayTextContentComponent.module.css";
import IDisplayTextContentComponent from "./IDisplayTextContentComponent";

export default function DisplayTextContentComponent(props: IDisplayTextContentComponent) {
    return (
        <div className={textContent} dangerouslySetInnerHTML={{__html: props.content}} />
    )
}