import ITextContentComponent from "./ITextContentComponent";

export default function TextContentComponent(props: ITextContentComponent) {
    return (
        <p>{props.content}</p>
    )
}