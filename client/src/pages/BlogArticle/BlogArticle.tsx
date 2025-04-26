import { useParams } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch";
import { BlogService } from "../../services/BlogService";
import { LoadingState } from "../../models/enums/LoadingState";
import { Loading } from "../Loading/Loading";
import { useContext, useMemo } from "react";
import { IsMobileContext } from "../../contexts/IsMobileContext";
import { blogArticleDate, blogArticleTitle, desktopBlogArticleContainer, mobileBlogArticleContainer } from "./BlogArticle.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import { alignItemsCenter, flexColumn, rowGap } from "../../styling/shared.module.css";
import RevealComponent from "../../components/RevealComponent/RevealComponent";
import { BlogItem } from "../../models/objects/BlogItem";
import ContentSwitcherComponent from "../../components/ContentSwitcherComponent/ContentSwitcherComponent";
import { renderPartialDate } from "../../utilities/helpers/DateRenderer";

export default function BlogArticle() {
    const {id} = useParams();

    const serviceCall = useMemo(() => BlogService.GetBlog(Number.parseInt(id ?? "")), [id]);
    const fetch = useFetch(serviceCall);
    const isMobile = useContext(IsMobileContext);

    if(fetch.loadingState == LoadingState.loading) {
        return <Loading/>
    }

    const response = fetch.response as BlogItem;

    return (
        <div className={classNameJoin([flexColumn, alignItemsCenter, rowGap, isMobile ? mobileBlogArticleContainer : desktopBlogArticleContainer])}>
            <RevealComponent timeoutInterval={100}>
                <div className={classNameJoin([flexColumn, alignItemsCenter])}>
                    <p className={blogArticleTitle}>{response.title}</p>
                    <p className={blogArticleDate}>{renderPartialDate(new Date(response.createdDate))}</p>
                </div>
                {fetch.response?.content.sort((a, b) => a.order - b.order).map((content, index) => (
                    <div key={index}>
                        {ContentSwitcherComponent(content)}
                    </div>
                ))}
            </RevealComponent>
        </div>
    )
}