import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";
import { BlogContentType } from "../../../models/enums/BlogContentType";
import IResourcesContentComponent from "../ResourcesContentComponent/IResourcesContentComponent";
import ResourcesContentComponent from "../ResourcesContentComponent/ResourcesContentComponent";
import IContentSwitcher from "./IContentSwitcher";
import TextContentComponent from "../TextContentComponent/TextContentComponent";
import { MediaContent, MervContent, TextContent } from "../../../models/objects/BlogItem";
import MediaContentComponent from "../MediaContentComponent/MediaContentComponent";
import MervContentComponent from "../MervContentComponent/MervContentComponent";

export default function ContentSwitcher(props: IContentSwitcher) {
    if (props.blogContent.type == BlogContentType.text) {
        return (
            <TextContentComponent
                content={props.blogContent as TextContent}
                editMode={props.editMode}
                updateBlogContent={props.updateBlogContent}
            />
        )
    }
    else if (props.blogContent.type == BlogContentType.media) {
        return (
            <MediaContentComponent
                content={props.blogContent as MediaContent}
                editMode={props.editMode}
                updateBlogContent={props.updateBlogContent}
            />
        )
    }
    else if (props.blogContent.type == BlogContentType.merv) {
        return (
            <MervContentComponent
                content={props.blogContent as MervContent}
                editMode={props.editMode}
                updateBlogContent={props.updateBlogContent}
            />
        )
    }
    else if (props.blogContent.type == BlogContentType.resources) {
        const resourcesParams = props.blogContent as IResourcesContentComponent;
        return <ResourcesContentComponent {...resourcesParams} />
    }
    else {
        return (
            <ErrorComponent
                errorText="Unrecognized content type."
            />
        );
    }
}