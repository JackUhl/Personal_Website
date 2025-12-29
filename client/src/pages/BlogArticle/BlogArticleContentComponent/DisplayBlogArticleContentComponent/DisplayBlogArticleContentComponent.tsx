import { alignItemsCenter, flexRow, justifyContentCenter } from "../../../../styling/shared.module.css";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner";
import { blogArticleContent } from "../../BlogArticle.module.css";
import contentSwitcher from "../ContentSwitcher";
import IDisplayBlogArticleContentComponent from "./IDisplayBlogArticleContentComponent";

export default function DisplayBlogArticleContentComponent(props: IDisplayBlogArticleContentComponent) {
    return (
        <>
            {props.blogContent.map((content, index) => (
                <div
                    key={index}
                    className={classNameJoin([flexRow, justifyContentCenter, alignItemsCenter, blogArticleContent])}
                >
                    {contentSwitcher(content)}
                </div>
            ))}
        </>
    )
}