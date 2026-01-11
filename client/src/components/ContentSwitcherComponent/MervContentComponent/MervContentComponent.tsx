import DisplayMervContentComponent from "./DisplayMervContentComponent/DisplayMervContentComponent";
import EditMervContentComponent from "./EditMervContentComponent/EditMervContentComponent";
import IMervContentComponent from "./IMervContentComponent";

export default function MervContentComponent(props: IMervContentComponent) {
    return (
        <>
            {props.editMode ? <EditMervContentComponent content={props.content} updateBlogContent={props.updateBlogContent} /> : <DisplayMervContentComponent {...props.content} />}
        </>
    )
}