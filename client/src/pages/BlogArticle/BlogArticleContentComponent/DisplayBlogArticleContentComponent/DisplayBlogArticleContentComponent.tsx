import { Link } from "react-router-dom";
import { BlogItemKeys } from "../../../../models/objects/BlogItem";
import { alignItemsCenter, flexColumn, flexRow, justifyContentCenter, spacing } from "../../../../styling/shared.module.css";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner";
import ContentSwitcher from "../ContentSwitcher";
import IDisplayBlogArticleContentComponent from "./IDisplayBlogArticleContentComponent";
import { BlogRoute } from "../../../../models/constants/RouteConstants";
import { renderPartialDate } from "../../../../utilities/helpers/DateRenderer";
import { blogArticleDate, blogArticleReturnArrow, blogArticleTitle } from "./DisplayBlogArticleContentComponent.module.css";
import arrowIcon from "../../../../assets/svg/arrow.svg"

export default function DisplayBlogArticleContentComponent(props: IDisplayBlogArticleContentComponent) {
    return (
        <>
            <Link
                to={BlogRoute}
                className={classNameJoin([flexRow, alignItemsCenter, spacing])}
            >
                <img src={arrowIcon} className={blogArticleReturnArrow} /><span>Back to Blogs</span>
            </Link>
            <div className={classNameJoin([flexColumn, alignItemsCenter, spacing])}>
                <p className={blogArticleTitle}>{props.blogItem.title}</p>
                <p className={blogArticleDate}>{renderPartialDate(new Date(props.blogItem.createdDate))}</p>
            </div>
            {props.blogItem[BlogItemKeys.Content].map((content, index) => (
                <div
                    key={index}
                    className={classNameJoin([flexRow, justifyContentCenter, alignItemsCenter, spacing])}
                >
                    <ContentSwitcher
                        blogContent={content}
                        editMode={false}
                        updateBlogContent={() => {}}
                    />
                </div>
            ))}
        </>
    )
}