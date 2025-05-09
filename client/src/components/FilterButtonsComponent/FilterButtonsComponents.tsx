import { alignItemsCenter, flexRow, flexWrap } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import { blogClearFilters, blogFilterGap, filterButtonContainer, selected } from "./FilterButtonsComponent.module.css";
import IFilterButtonsComponent from "./IFilterButtonsComponent";

export default function FilterButtonsComponent(props: IFilterButtonsComponent) {
    const allBlogTags = [...new Set(props.allBlogs.flatMap(blog => blog.tags))];

    const resetSelectedBlogTags = () => {
        props.setSelectedBlogTags([]);
    }

    const toggleFilterButton = (blogTag: string) => {
        if(props.selectedBlogTags.includes(blogTag)) {
            props.setSelectedBlogTags(props.selectedBlogTags.filter(seletedTag => seletedTag != blogTag))
        }
        else {
            props.setSelectedBlogTags([...props.selectedBlogTags, blogTag])
        }
    }

    return (
        <div className={classNameJoin([flexRow, alignItemsCenter, flexWrap, blogFilterGap])}>
            {allBlogTags.map((blogTag, index) => (
                <div className={classNameJoin([filterButtonContainer, props.selectedBlogTags.includes(blogTag) ? selected : ""])} onClick={() => toggleFilterButton(blogTag)} key={index}>
                    <p>{blogTag}</p>
                </div>
            ))}
            {props.selectedBlogTags.length > 0 && <p className={blogClearFilters} onClick={resetSelectedBlogTags}>Clear Filters</p>}
        </div>
    )
}