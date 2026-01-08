import { useMemo, useState } from "react";
import RevealComponent from "../../../components/RevealComponent/RevealComponent";
import FilterButtonsComponent from "./FilterButtonsComponent/FilterButtonsComponents";
import IDisplayBlogComponent from "./IDisplayBlogComponent";
import BlogCardComponent from "./BlogCardComponent/BlogCardComponent";
import { blogCard } from "./DisplayBlogComponent.module.css";

export default function DisplayBlogComponent(props: IDisplayBlogComponent) {
    const [selectedBlogTags, setSelectedBlogTags] = useState<string[]>([]);

    const filtered = useMemo(() => (selectedBlogTags.length > 0 ? props.allBlogs?.filter(blogItem =>
        blogItem.tags.some(tag => selectedBlogTags.includes(tag))
    ) : props.allBlogs), [props.allBlogs, selectedBlogTags]);

    const filteredBlogCards = useMemo(() => (
        filtered?.map((blogItem, index) => (
            <div key={index} className={blogCard}>
                <BlogCardComponent blogItem={blogItem} />
            </div>
        ))
    ), [filtered]);

    return (
        <RevealComponent>
            <FilterButtonsComponent allBlogs={props.allBlogs ?? []} selectedBlogTags={selectedBlogTags} setSelectedBlogTags={setSelectedBlogTags} />
            <RevealComponent>
                {filteredBlogCards}
            </RevealComponent>
        </RevealComponent>
    )
}