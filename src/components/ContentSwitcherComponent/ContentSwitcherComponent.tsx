import { BlogContent } from "../../models/objects/BlogItem";
import { BlogContentType } from "../../models/enums/BlogContentType";
import TextContentComponent from "../TextContentComponent/TextContentComponent";
import MediaContentComponent from "../MediaContentComponent/MediaContentComponent";
import IMediaContentComponent from "../MediaContentComponent/IMediaContentComponent";
import ITextContentComponent from "../TextContentComponent/ITextContentComponent";
import { IMervContentComponent } from "../MervContentComponent/IMervContentComponent";
import MervContentComponent from "../MervContentComponent/MervContentComponent";

export default function ContentSwitcherComponent(blogContent: BlogContent) {
    if(blogContent.type == BlogContentType.text) {
        let params = blogContent as ITextContentComponent;
        return <TextContentComponent {...params}/>
    }
    else if (blogContent.type == BlogContentType.media) {
        let params = blogContent as IMediaContentComponent;
        return <MediaContentComponent {...params}/>
    }
    else {
        let params = blogContent as IMervContentComponent;
        return <MervContentComponent {...params}/>
    }
}