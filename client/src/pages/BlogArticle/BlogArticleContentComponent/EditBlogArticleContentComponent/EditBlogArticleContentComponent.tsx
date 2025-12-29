import { flexRow, justifyContentCenter, alignItemsCenter } from "../../../../styling/shared.module.css";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner";
import { blogArticleContent } from "../../BlogArticle.module.css";
import contentSwitcher from "../ContentSwitcher";
import IEditBlogArticleContentComponent from "./IEditBlogArticleContentComponent";

export default function EditBlogArticleContentComponent(props: IEditBlogArticleContentComponent) {
    return (
        <>
            {props.blogContent.map((content, index) => (
                <div
                    key={index}
                    className={classNameJoin([flexRow, justifyContentCenter, alignItemsCenter, blogArticleContent])}
                >
                    <p>Edit: </p>
                    {contentSwitcher(content)}
                </div>
            ))}
        </>
    )
}