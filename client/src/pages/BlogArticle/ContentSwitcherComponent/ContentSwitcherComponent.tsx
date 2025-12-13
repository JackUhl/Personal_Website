import TextContentComponent from "../TextContentComponent/TextContentComponent";
import MediaContentComponent from "../MediaContentComponent/MediaContentComponent";
import IMediaContentComponent from "../MediaContentComponent/IMediaContentComponent";
import ITextContentComponent from "../TextContentComponent/ITextContentComponent";
import IMervContentComponent from "../MervContentComponent/IMervContentComponent";
import MervContentComponent from "../MervContentComponent/MervContentComponent";
import IResourcesContentComponent from "../ResourcesContentComponent/IResourcesContentComponent";
import ResourcesContentComponent from "../ResourcesContentComponent/ResourcesContentComponent";
import ErrorComponent from "../../../components/ErrorComponent/ErrorComponent";
import { BlogContentType } from "../../../models/enums/BlogContentType";
import { BlogContent } from "../../../models/objects/BlogItem";

export default function ContentSwitcherComponent(blogContent: BlogContent) {
    if (blogContent.type == BlogContentType.text) {
        const textParams = blogContent as ITextContentComponent;
        return <TextContentComponent {...textParams} />
    }
    else if (blogContent.type == BlogContentType.media) {
        const mediaParams = blogContent as IMediaContentComponent;
        return <MediaContentComponent {...mediaParams} />
    }
    else if (blogContent.type == BlogContentType.merv) {
        const mervParams = blogContent as IMervContentComponent;
        return <MervContentComponent {...mervParams} />
    }
    else if (blogContent.type == BlogContentType.resources) {
        const resourcesParams = blogContent as IResourcesContentComponent;
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