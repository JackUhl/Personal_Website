import DisplayMediaContentComponent from "./DisplayMediaContentComponent/DisplayMediaContentComponent";
import EditMediaContentComponent from "./EditMediaContentComponent/EditMediaContentComponent";
import { IMediaContentComponent } from "./IMediaContentComponent";

export default function MediaContentComponent(props: IMediaContentComponent) {
    return (
        <>
            {props.editMode ? <EditMediaContentComponent content={props.content} updateBlogContent={props.updateBlogContent}/> : <DisplayMediaContentComponent {...props.content}/>}
        </>
    )
}