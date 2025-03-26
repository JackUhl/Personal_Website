import ITextContentComponent from "./ITextContentComponent";
import { textContent } from "./TextContentComponent.module.css";

export default function TextContentComponent(props: ITextContentComponent) {
    return (
        <div className={textContent} dangerouslySetInnerHTML={{__html: props.content}} />
    )
}