import { useContext, useMemo, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { LoadingState } from "../../models/enums/LoadingState";
import { BlogService } from "../../services/BlogService";
import { flexColumn, justifyContentCenter, rowGap } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import Loading from "../Loading/Loading";
import { mobileBlogContainer, desktopBlogContainer } from "./Blog.module.css";
import RevealComponent from "../../components/RevealComponent/RevealComponent";
import { IsMobileContext } from "../../contexts/IsMobileContext";
import BlogCardComponent from "../../components/BlogCardComponent/BlogCardComponent";
import Failed from "../Failed/Failed";
import { RevealTimeoutInMs } from "../../models/constants/ConfigurationConstants";
import FilterButtonsComponent from "../../components/FilterButtonsComponent/FilterButtonsComponents";
import { BlogItem } from "../../models/objects/BlogItem";

export default function Blog() {
    const [selectedBlogTags, setSelectedBlogTags] = useState<string[]>([]);

    const isMobile = useContext(IsMobileContext);
    const serviceCall = useMemo(() => BlogService.GetAllBlogs(), []);
    const fetch = useFetch(serviceCall);

    if(fetch.loadingState == LoadingState.loading) {
        return <Loading/>
    }

    if(fetch.loadingState == LoadingState.failed) {
        return <Failed/>
    }

    const filteredBlogs = selectedBlogTags.length > 0 ? fetch.response?.filter(blogItem => 
        blogItem.tags.some(tag => selectedBlogTags.includes(tag))
    ) : fetch.response;

    return (
        <div className={classNameJoin([flexColumn, justifyContentCenter, rowGap, isMobile ? mobileBlogContainer : desktopBlogContainer])}>
            <RevealComponent timeoutInterval={RevealTimeoutInMs}>
                <FilterButtonsComponent allBlogs={fetch.response as BlogItem[]} selectedBlogTags={selectedBlogTags} setSelectedBlogTags={setSelectedBlogTags}/>
                {filteredBlogs?.map((blogItem, index) => (
                    <BlogCardComponent blogItem={blogItem} key={index}/>
                ))}
            </RevealComponent>
        </div>
    )
}