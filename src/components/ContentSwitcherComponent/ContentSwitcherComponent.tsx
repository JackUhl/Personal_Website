import { BlogContent } from "../../models/objects/BlogItem";
import { BlogContentType } from "../../models/enums/BlogContentType";
import TextContentComponent from "../TextContentComponent/TextContentComponent";
import MediaContentComponent from "../MediaContentComponent/MediaContentComponent";
import IMediaContentComponent from "../MediaContentComponent/IMediaContentComponent";
import ITextContentComponent from "../TextContentComponent/ITextContentComponent";

export default function ContentSwitcherComponent(blogContent: BlogContent) {
    if(blogContent.type == BlogContentType.text) {
        let params = blogContent as ITextContentComponent;
        return <TextContentComponent {...params}/>
    }
    else {
        let params = blogContent as IMediaContentComponent;
        return <MediaContentComponent {...params}/>
    }
}