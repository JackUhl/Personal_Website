import { useEffect, useState } from "react";
import BlogCardComponent from "../../components/BlogCardComponent/BlogCardComponent";
import FilterButtonComponent from "../../components/FilterButtonComponent/FilterButtonComponent";
import { useFetch } from "../../hooks/useFetch";
import { LoadingState } from "../../models/enums/LoadingState";
import { PersonalSiteService } from "../../services/PersonalSiteService";
import { alignItemsCenter, flexColumn, flexRow, flexWrap, justifyContentCenter, rowGap } from "../../styling/shared.module.css";
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";
import { Loading } from "../Loading/Loading";
import { blogContainer, blogFilterGap, blogClearFilters } from "./Blog.module.css";

export default function Blog() {
    const [allBlogTags, setAllBlogTags] = useState<string[]>([]);
    const [selectedBlogTags, setSelectedBlogTags] = useState<string[]>([]);

    const fetch = useFetch(PersonalSiteService.GetBlog());

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

    if(fetch.loadingState == LoadingState.loading) {
        return <Loading/>
    }

    const resetSelectedBlogTags = () => {
        setSelectedBlogTags([]);
    }

    const filteredBlogs = selectedBlogTags.length > 0 ? fetch.response?.filter(blogItem => 
        blogItem.tags.some(tag => selectedBlogTags.includes(tag))
    ) : fetch.response;

    return (
        <div className={ClassnameJoiner.join([flexColumn, justifyContentCenter, rowGap, blogContainer])}>
            <div className={ClassnameJoiner.join([flexRow, alignItemsCenter, flexWrap, blogFilterGap])}>
                {allBlogTags.map((blogTag, index) => (
                    <FilterButtonComponent title={blogTag} selectedBlogTags={selectedBlogTags} setSelectedBlogTags={setSelectedBlogTags} key={index}/>
                ))}
                {selectedBlogTags.length > 0 && <p className={blogClearFilters} onClick={resetSelectedBlogTags}>Clear Filters</p>}
            </div>
            {filteredBlogs?.map((blogItem, index) => (
                <BlogCardComponent blogItem={blogItem} key={index}/>
            ))}
    </div>
    )
}