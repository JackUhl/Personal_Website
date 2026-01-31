import { useContext, useState } from "react";
import RevealComponent from "../../../components/RevealComponent/RevealComponent";
import FilterButtonsComponent from "./FilterButtonsComponent/FilterButtonsComponents";
import IDisplayBlogComponent from "./IDisplayBlogComponent";
import BlogCardComponent from "./BlogCardComponent/BlogCardComponent";
import { blogCard, deleteButton } from "./DisplayBlogComponent.module.css";
import { classNameJoin } from "../../../utilities/helpers/ClassnameJoiner";
import { MongoItemKeys } from "../../../models/objects/MongoItem";
import { flexRow, justifyContentEnd, icon } from "../../../styling/shared.module.css";
import closeSvg from "../../../assets/svg/close.svg"
import ConfirmationButtonComponent from "./ConfirmationButtonComponent/ConfirmationButtonComponent";
import { AuthenticationContext } from "../../../contexts/AuthenticationContext";

export default function DisplayBlogComponent(props: IDisplayBlogComponent) {
    const [selectedBlogTags, setSelectedBlogTags] = useState<string[]>([]);

    const isAdmin = useContext(AuthenticationContext);

    const filtered = (selectedBlogTags.length > 0 ? props.allBlogs?.filter(blogItem =>
        blogItem.tags.some(tag => selectedBlogTags.includes(tag))
    ) : props.allBlogs);

    const filteredBlogCards = filtered?.map((blogItem) => (
        <div
            key={blogItem[MongoItemKeys._Id]}
            className={blogCard}
        >
            {isAdmin && (
                <div className={classNameJoin([flexRow, justifyContentEnd, deleteButton])}>
                    <ConfirmationButtonComponent
                        onClick={() => props.deleteBlog(blogItem[MongoItemKeys._Id])}
                    >
                        <div className={classNameJoin([flexRow])}>
                            <img src={closeSvg} className={icon} />
                        </div>
                    </ConfirmationButtonComponent>
                </div>
            )}
            <BlogCardComponent blogItem={blogItem} />
        </div>
    ));

    return (
        <RevealComponent>
            <FilterButtonsComponent allBlogs={props.allBlogs ?? []} selectedBlogTags={selectedBlogTags} setSelectedBlogTags={setSelectedBlogTags} />
            <RevealComponent>
                {filteredBlogCards}
            </RevealComponent>
        </RevealComponent>
    )
}