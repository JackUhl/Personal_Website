import { BlogItemKeys } from "../../../../models/objects/BlogItem";
import { alignItemsCenter, flexRow, justifyContentCenter } from "../../../../styling/shared.module.css";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner";
import ContentSwitcher from "../ContentSwitcher";
import { spacing } from "./DisplayBlogArticleContentComponent.module.css";
import IDisplayBlogArticleContentComponent from "./IDisplayBlogArticleContentComponent";

export default function DisplayBlogArticleContentComponent(props: IDisplayBlogArticleContentComponent) {
    return (
        <>
            {props.blogItem[BlogItemKeys.Content].map((content, index) => (
                <div
                    key={index}
                    className={classNameJoin([flexRow, justifyContentCenter, alignItemsCenter, spacing])}
                >
                    <ContentSwitcher
                        blogContent={content}
                        editMode={false}
                    />
                </div>
            ))}
        </>
    )
}