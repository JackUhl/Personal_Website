import { useMemo, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { LoadingState } from "../../models/enums/LoadingState";
import { BlogService } from "../../services/BlogService";
import Loading from "../Loading/Loading";
import { mobileBlogContainer, desktopBlogContainer, blogCard } from "./Blog.module.css";
import RevealComponent from "../../components/RevealComponent/RevealComponent";
import Failed from "../Failed/Failed";
import { BlogItem } from "../../models/objects/BlogItem";
import { useIsMobile } from "../../hooks/useIsMobile";
import FilterButtonsComponent from "./FilterButtonsComponent/FilterButtonsComponents";
import BlogCardComponent from "./BlogCardComponent/BlogCardComponent";

export default function Blog() {
    const [selectedBlogTags, setSelectedBlogTags] = useState<string[]>([]);

    const isMobile = useIsMobile();
    const serviceCall = useMemo(() => BlogService.GetAllBlogs(), []);
    const { response, loadingState } = useFetch(serviceCall);

    if (loadingState == LoadingState.loading) {
        return <Loading />
    }

    if (loadingState == LoadingState.failed) {
        return <Failed />
    }

    const filteredBlogs = selectedBlogTags.length > 0 ? response?.filter(blogItem =>
        blogItem.tags.some(tag => selectedBlogTags.includes(tag))
    ) : response;

    return (
        <div className={isMobile ? mobileBlogContainer : desktopBlogContainer}>
            <RevealComponent>
                <FilterButtonsComponent allBlogs={response as BlogItem[]} selectedBlogTags={selectedBlogTags} setSelectedBlogTags={setSelectedBlogTags} />
                <RevealComponent key={selectedBlogTags.join()}>
                    {filteredBlogs?.map((blogItem, index) => (
                        <div key={index} className={blogCard}>
                            <BlogCardComponent blogItem={blogItem} />
                        </div>
                    ))}
                </RevealComponent>
            </RevealComponent>
        </div>
    )
}