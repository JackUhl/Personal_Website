import ErrorComponent from "../ErrorComponent/ErrorComponent";
import { BlogContentType } from "../../models/enums/BlogContentType";
import IContentSwitcherComponent from "./IContentSwitcherComponent";
import EditTextContentComponent from "./TextContentComponent/EditTextContentComponent/EditTextContentComponent";
import DisplayTextContentComponent from "./TextContentComponent/DisplayTextContentComponent/DisplayTextContentComponent";
import EditMediaContentComponent from "./MediaContentComponent/EditMediaContentComponent/EditMediaContentComponent";
import DisplayMediaContentComponent from "./MediaContentComponent/DisplayMediaContentComponent/DisplayMediaContentComponent";
import DisplayMervContentComponent from "./MervContentComponent/DisplayMervContentComponent/DisplayMervContentComponent";
import EditMervContentComponent from "./MervContentComponent/EditMervContentComponent/EditMervContentComponent";
import DisplayResourcesContentComponent from "./ResourcesContentComponent/DisplayResourcesContentComponent/DisplayResourcesContentComponent";
import EditResourcesContentComponent from "./ResourcesContentComponent/EditResourcesContentComponent/EditResourcesContentComponent";
import EditTitleComponentComponent from "./TitleContentComponent/EditTitleContentComponent/EditTitleContentComponent";
import DisplayTitleContentComponent from "./TitleContentComponent/DisplayTitleContentComponent/DisplayTitleContentComponent";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner/ClassnameJoiner";
import { flexRow, justifyContentCenter } from "../../styling/shared.module.css";

export default function ContentSwitcherComponent(props: IContentSwitcherComponent) {
    const renderContent = () => {
        if (props.blogContent.type == BlogContentType.text) {
            return props.editMode
                ? <EditTextContentComponent content={props.blogContent} updateBlogContent={props.updateBlogContent} />
                : <DisplayTextContentComponent {...props.blogContent} />;
        }

        if (props.blogContent.type == BlogContentType.media) {
            return props.editMode
                ? <EditMediaContentComponent content={props.blogContent} updateBlogContent={props.updateBlogContent} />
                : <DisplayMediaContentComponent {...props.blogContent} />;
        }

        if (props.blogContent.type == BlogContentType.merv) {
            return props.editMode
                ? <EditMervContentComponent content={props.blogContent} updateBlogContent={props.updateBlogContent} />
                : <DisplayMervContentComponent {...props.blogContent} />;
        }

        if (props.blogContent.type == BlogContentType.resources) {
            return props.editMode
                ? <EditResourcesContentComponent content={props.blogContent} updateBlogContent={props.updateBlogContent} />
                : <DisplayResourcesContentComponent {...props.blogContent} />;
        }

        if (props.blogContent.type == BlogContentType.title) {
            return props.editMode
                ? <EditTitleComponentComponent content={props.blogContent} updateBlogContent={props.updateBlogContent} />
                : <DisplayTitleContentComponent {...props.blogContent} />
        }

        return (
            <ErrorComponent
                errorText="Unrecognized content type."
            />
        );
    }

    return (
        <div data-testid="content-switcher" className={classNameJoin([flexRow, justifyContentCenter])}>
            {renderContent()}
        </div>
    );
}