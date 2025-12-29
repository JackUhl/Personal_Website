import { Link } from "react-router-dom"
import { BlogRoute } from "../../../../models/constants/RouteConstants"
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner"
import { alignItemsCenter, flexColumn, flexRow } from "../../../../styling/shared.module.css"
import IDisplayBlogArticleHeaderComponent from "./IDisplayBlogArticleHeaderComponent"
import { blogArticleContent, blogArticleDate, blogArticleReturnArrow, blogArticleTitle } from "./DisplayBlogArticleHeaderComponent.module.css"
import { renderPartialDate } from "../../../../utilities/helpers/DateRenderer"
import arrowIcon from "../../../../assets/svg/arrow.svg"

export default function DisplayBlogArticleHeaderComponent(props: IDisplayBlogArticleHeaderComponent) {
    return (
        <>
            <Link
                to={BlogRoute}
                className={classNameJoin([flexRow, alignItemsCenter])}
            >
                <img src={arrowIcon} className={blogArticleReturnArrow} /><span>Back to Blogs</span>
            </Link>
            <div className={classNameJoin([flexColumn, alignItemsCenter, blogArticleContent])}>
                <p className={blogArticleTitle}>{props.blogItem.title}</p>
                <p className={blogArticleDate}>{renderPartialDate(new Date(props.blogItem.createdDate))}</p>
            </div>
        </>
    )
}