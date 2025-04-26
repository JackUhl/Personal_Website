import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import FilterButtonComponent from "../../components/FilterButtonComponent/FilterButtonComponent";
import { useFetch } from "../../hooks/useFetch";
import { LoadingState } from "../../models/enums/LoadingState";
import { BlogService } from "../../services/BlogService";
import { alignItemsCenter, flexColumn, flexRow, flexWrap, justifyContentCenter, rowGap } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import { Loading } from "../Loading/Loading";
import { blogFilterGap, blogClearFilters, mobileBlogContainer, desktopBlogContainer } from "./Blog.module.css";
import RevealComponent from "../../components/RevealComponent/RevealComponent";
import { IsMobileContext } from "../../contexts/IsMobileContext";
import BlogCardComponent from "../../components/BlogCardComponent/BlogCardComponent";

export default function Blog() {
    const [allBlogTags, setAllBlogTags] = useState<string[]>([]);
    const [selectedBlogTags, setSelectedBlogTags] = useState<string[]>([]);

    const isMobile = useContext(IsMobileContext);
    const serviceCall = useMemo(() => BlogService.GetAllBlogs(), []);
    const fetch = useFetch(serviceCall);

    useEffect(() => {
        if(fetch.response) {
            let tags : string[] = [];
            fetch.response.forEach((blog) => {
                blog.tags.forEach((tag) => {
                    if(!tags.includes(tag)) {
                        tags.push(tag);
                    }
                })
            });
            setAllBlogTags(tags);
        }
    }, [fetch.response])

    const resetSelectedBlogTags = useCallback(() => {
        setSelectedBlogTags([]);
    }, []);

    if(fetch.loadingState == LoadingState.loading) {
        return <Loading/>
    }

    const filteredBlogs = selectedBlogTags.length > 0 ? fetch.response?.filter(blogItem => 
        blogItem.tags.some(tag => selectedBlogTags.includes(tag))
    ) : fetch.response;

    return (
        <div className={classNameJoin([flexColumn, justifyContentCenter, rowGap, isMobile ? mobileBlogContainer : desktopBlogContainer])}>
            <RevealComponent timeoutInterval={100}>
                <div className={classNameJoin([flexRow, alignItemsCenter, flexWrap, blogFilterGap])}>
                    {allBlogTags.map((blogTag, index) => (
                        <FilterButtonComponent title={blogTag} selectedBlogTags={selectedBlogTags} setSelectedBlogTags={setSelectedBlogTags} key={index}/>
                    ))}
                    {selectedBlogTags.length > 0 && <p className={blogClearFilters} onClick={resetSelectedBlogTags}>Clear Filters</p>}
                </div>
                {filteredBlogs?.map((blogItem, index) => (
                    <BlogCardComponent blogItem={blogItem} key={index}/>
                ))}
            </RevealComponent>
        </div>
    )
}