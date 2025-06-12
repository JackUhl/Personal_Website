import { useMemo, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { LoadingState } from "../../models/enums/LoadingState";
import { BlogService } from "../../services/BlogService";
import Loading from "../Loading/Loading";
import { mobileBlogContainer, desktopBlogContainer, blogCard } from "./Blog.module.css";
import RevealComponent from "../../components/RevealComponent/RevealComponent";
import BlogCardComponent from "../../components/BlogCardComponent/BlogCardComponent";
import Failed from "../Failed/Failed";
import FilterButtonsComponent from "../../components/FilterButtonsComponent/FilterButtonsComponents";
import { BlogItem } from "../../models/objects/BlogItem";
import { useIsMobile } from "../../hooks/useIsMobile";

export default function Blog() {
    const [selectedBlogTags, setSelectedBlogTags] = useState<string[]>([]);

    const isMobile = useIsMobile();
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
        <div className={isMobile ? mobileBlogContainer : desktopBlogContainer}>
            <RevealComponent>
                <FilterButtonsComponent allBlogs={fetch.response as BlogItem[]} selectedBlogTags={selectedBlogTags} setSelectedBlogTags={setSelectedBlogTags}/>
                <RevealComponent key={selectedBlogTags.join()}>
                    {filteredBlogs?.map((blogItem, index) => (
                        <div key={index} className={blogCard}>
                            <BlogCardComponent blogItem={blogItem}/>
                        </div>
                    ))}
                </RevealComponent>
            </RevealComponent>
        </div>
    )
}