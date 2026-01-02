import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";
import { BlogContentType } from "../../../models/enums/BlogContentType";
import IMediaContentComponent from "../MediaContentComponent/IMediaContentComponent";
import MediaContentComponent from "../MediaContentComponent/MediaContentComponent";
import IMervContentComponent from "../MervContentComponent/IMervContentComponent";
import MervContentComponent from "../MervContentComponent/MervContentComponent";
import IResourcesContentComponent from "../ResourcesContentComponent/IResourcesContentComponent";
import ResourcesContentComponent from "../ResourcesContentComponent/ResourcesContentComponent";
import IContentSwitcher from "./IContentSwitcher";
import TextContentComponent from "../TextContentComponent/TextContentComponent";
import { BlogContent, TextContent } from "../../../models/objects/BlogItem";

export default function ContentSwitcher(props: IContentSwitcher) {
    if (props.blogContent.type == BlogContentType.text) {
        const textParams = props.blogContent as TextContent;
        return (
            <TextContentComponent
                content={textParams}
                editMode={props.editMode}
                updatedBlogItem={(blogContent) => props.updateBlogItem(blogContent as BlogContent)}
            />
        )
    }
    else if (props.blogContent.type == BlogContentType.media) {
        const mediaParams = props.blogContent as IMediaContentComponent;
        return <MediaContentComponent {...mediaParams} />
    }
    else if (props.blogContent.type == BlogContentType.merv) {
        const mervParams = props.blogContent as IMervContentComponent;
        return <MervContentComponent {...mervParams} />
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