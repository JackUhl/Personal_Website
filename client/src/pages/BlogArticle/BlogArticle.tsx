import { Link, useParams } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch";
import { BlogService } from "../../services/BlogService";
import { LoadingState } from "../../models/enums/LoadingState";
import Loading from "../Loading/Loading";
import { useMemo } from "react";
import { blogArticleContent, blogArticleDate, blogArticleReturnArrow, blogArticleTitle, desktopBlogArticleContainer, mobileBlogArticleContainer } from "./BlogArticle.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import { alignItemsCenter, flexColumn, flexRow, justifyContentCenter } from "../../styling/shared.module.css";
import RevealComponent from "../../components/RevealComponent/RevealComponent";
import { renderPartialDate } from "../../utilities/helpers/DateRenderer";
import Failed from "../Failed/Failed";
import { useIsMobile } from "../../hooks/useIsMobile";
import { BlogRoute } from "../../models/constants/RouteConstants";
import arrowIcon from "../../assets/svg/arrow.svg";
import ContentSwitcherComponent from "./ContentSwitcherComponent/ContentSwitcherComponent";

export default function BlogArticle() {
    const {id} = useParams();

    const serviceCall = useMemo(() => BlogService.GetBlog(id), [id]);
    const {response, loadingState} = useFetch(serviceCall);
    const isMobile = useIsMobile();

    if(loadingState == LoadingState.loading) {
        return <Loading/>
    }

    if(loadingState == LoadingState.failed) {
        return <Failed/>
    }

    return (
        <div className={isMobile ? mobileBlogArticleContainer : desktopBlogArticleContainer}>
            <RevealComponent>
                <Link
                    to={BlogRoute}
                    className={classNameJoin([flexRow, alignItemsCenter])}
                >
                    <img src={arrowIcon} className={blogArticleReturnArrow}/><span>Back to Blogs</span>
                </Link>
                <div className={classNameJoin([flexColumn, alignItemsCenter, blogArticleContent])}>
                    <p className={blogArticleTitle}>{response?.title}</p>
                    <p className={blogArticleDate}>{renderPartialDate(new Date(response?.createdDate ?? ""))}</p>
                </div>
                {response?.content.map((content, index) => (
                    <div key={index} className={classNameJoin([flexRow, justifyContentCenter, alignItemsCenter, blogArticleContent])}>
                        {ContentSwitcherComponent(content)}
                    </div>
                ))}
            </RevealComponent>
        </div>
    )
}