import { useEffect, useState } from "react";
import BlogCardComponent from "../../components/BlogComponent/BlogCardComponent";
import FilterButtonComponent from "../../components/FilterButtonComponent/FilterButtonComponent";
import { useFetch } from "../../hooks/useFetch";
import { LoadingState } from "../../models/enums/LoadingState";
import { PersonalSiteService } from "../../services/PersonalSiteService";
import { flexColumn, flexRow, justifyContentCenter, rowGap } from "../../styling/shared.module.css";
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";
import { Loading } from "../Loading/Loading";
import { blogCardShadow, blogContainer, blogFilterColumnGap } from "./Blog.module.css";

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

    const filteredBlogs = selectedBlogTags.length > 0 ? fetch.response?.filter(blogItem => 
        blogItem.tags.some(tag => selectedBlogTags.includes(tag))
    ) : fetch.response;

    return (
        <div className={ClassnameJoiner.join([flexColumn, justifyContentCenter, rowGap, blogContainer])}>
            <div className={ClassnameJoiner.join([flexRow, blogFilterColumnGap])}>
                {allBlogTags.map((blogTag, index) => (
                    <FilterButtonComponent title={blogTag} selectedBlogTags={selectedBlogTags} setSelectedBlogTags={setSelectedBlogTags} key={index}/>
                ))}
            </div>
            {filteredBlogs?.map((blogItem, index) => (
                <div className={blogCardShadow} key={index}>
                    <BlogCardComponent blogItem={blogItem}/>
                </div>
            ))}
    </div>
    )
}