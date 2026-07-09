import { Link } from "react-router-dom";

import arrowIcon from "../../../assets/svg/arrow.svg"
import ContentSwitcherComponent from "../../../components/ContentSwitcherComponent/ContentSwitcherComponent";
import { BlogRoute } from "../../../models/constants/RouteConstants";
import { BlogItemKeys } from "../../../models/objects/BlogItem";
import { alignItemsCenter, flexColumn, flexRow, justifyContentCenter,spacing } from "../../../styling/shared.module.css";
import { classNameJoin } from "../../../utilities/helpers/ClassnameJoiner/ClassnameJoiner";
import { renderPartialDate } from "../../../utilities/helpers/DateRenderer/DateRenderer";
import { blogArticleDate, blogArticleReturnArrow, blogArticleTitle } from "./DisplayBlogArticleContentComponent.module.css";
import IDisplayBlogArticleContentComponent from "./IDisplayBlogArticleContentComponent";

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
                    data-testid="content-block"
                >
                    <ContentSwitcherComponent
                        blogContent={content}
                        editMode={false}
                        updateBlogContent={() => {}}
                    />
                </div>
            ))}
        </>
    )
}