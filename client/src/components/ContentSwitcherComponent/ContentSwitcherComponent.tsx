import ErrorComponent from "../ErrorComponent/ErrorComponent";
import { BlogContentType } from "../../models/enums/BlogContentType";
import TextContentComponent from "../../pages/BlogArticle/TextContentComponent/TextContentComponent";
import { MediaContent, MervContent, ResourcesContent, TextContent } from "../../models/objects/BlogItem";
import MediaContentComponent from "../../pages/BlogArticle/MediaContentComponent/MediaContentComponent";
import MervContentComponent from "../../pages/BlogArticle/MervContentComponent/MervContentComponent";
import ResourcesContentComponent from "../../pages/BlogArticle/ResourcesContentComponent/ResourcesContentComponent";
import IContentSwitcherComponent from "./IContentSwitcherComponent";

export default function ContentSwitcherComponent(props: IContentSwitcherComponent) {
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
        return (
            <ResourcesContentComponent
                content={props.blogContent as ResourcesContent}
                editMode={props.editMode}
                updateBlogContent={props.updateBlogContent}
            />
        )
    }
    else {
        return (
            <ErrorComponent
                errorText="Unrecognized content type."
            />
        );
    }
}