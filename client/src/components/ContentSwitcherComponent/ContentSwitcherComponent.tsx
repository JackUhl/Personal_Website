import { BlogContent } from "../../models/objects/BlogItem";
import { BlogContentType } from "../../models/enums/BlogContentType";
import TextContentComponent from "../TextContentComponent/TextContentComponent";
import MediaContentComponent from "../MediaContentComponent/MediaContentComponent";
import IMediaContentComponent from "../MediaContentComponent/IMediaContentComponent";
import ITextContentComponent from "../TextContentComponent/ITextContentComponent";
import IMervContentComponent from "../MervContentComponent/IMervContentComponent";
import MervContentComponent from "../MervContentComponent/MervContentComponent";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import IResourcesContentComponent from "../ResourcesContentComponent/IResourcesContentComponent";
import ResourcesContentComponent from "../ResourcesContentComponent/ResourcesContentComponent";

export default function ContentSwitcherComponent(blogContent: BlogContent) {
   switch (blogContent.type) {
        case BlogContentType.text:
            let textParams = blogContent as ITextContentComponent;
            return <TextContentComponent {...textParams}/>
        case BlogContentType.media:
            let mediaParams = blogContent as IMediaContentComponent;
            return <MediaContentComponent {...mediaParams}/>
        case BlogContentType.merv:
            let mervParams = blogContent as IMervContentComponent;
            return <MervContentComponent {...mervParams}/>
        case BlogContentType.resources:
            let resourcesParams = blogContent as IResourcesContentComponent;
            return <ResourcesContentComponent {...resourcesParams}/>
        default:
            return (
                <ErrorComponent 
                    errorText="Unrecognized content type."
                />
            );
    }
}