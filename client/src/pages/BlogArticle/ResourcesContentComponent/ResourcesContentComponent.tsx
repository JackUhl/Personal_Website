import DisplayResourcesContentComponent from "./DisplayResourcesContentComponent/DisplayResourcesContentComponent";
import EditResourcesContentComponent from "./EditResourcesContentComponent/EditResourcesContentComponent";
import IResourcesContentComponent from "./IResourcesContentComponent";

export default function ResourcesContentComponent(props: IResourcesContentComponent) {
    return (
        <>
            {props.editMode ? <EditResourcesContentComponent content={props.content} updateBlogContent={props.updateBlogContent}/> : <DisplayResourcesContentComponent {...props.content}/>}
        </>
    )
}