import DisplayTextContentComponent from "./DisplayTextContentComponent/DisplayTextContentComponent";
import EditTextContentComponent from "./EditTextContentComponent/EditTextContentComponent";
import ITextContentComponent from "./ITextContentComponent";

export default function TextContentComponent(props: ITextContentComponent) {
    return (
        <>
            {props.editMode ? <EditTextContentComponent content={props.content} updateBlogItems={props.updatedBlogItem}/> : <DisplayTextContentComponent {...props.content} />}
        </>
    )
}