import OnClickButtonComponent from "../../../../components/OnClickButtonComponent/OnButtonButtonComponent";
import { BlogContent, BlogContentTypeDefaults, BlogItemKeys, ContentKeys } from "../../../../models/objects/BlogItem";
import { flexRow, justifyContentCenter, justifyContentEnd, spacing } from "../../../../styling/shared.module.css";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner";
import ContentSwitcher from "../ContentSwitcher";
import IEditBlogArticleContentComponent from "./IEditBlogArticleContentComponent";
import closeSvg from "../../../../assets/svg/close.svg"
import plusSvg from "../../../../assets/svg/plus.svg"
import { blogArticleContent, icon } from "./EditBlogArticleContentComponent.module.css";
import SelectInputComponent from "../../../../components/InputComponents/SelectInputComponent/SelectInputComponent";
import { BlogContentType } from "../../../../models/enums/BlogContentType";

export default function EditBlogArticleContentComponent(props: IEditBlogArticleContentComponent) {
    const handleUpdateBlogItem = (blogContent: BlogContent, index: number) => {
        const updatedBlogItem = { ...props.blogItem };
        updatedBlogItem[BlogItemKeys.Content][index] = blogContent;

        props.updateBlogItem(updatedBlogItem);
    }

    const handleDeleteBlogItem = (index: number) => {
        const updatedBlogItem = { ...props.blogItem };
        updatedBlogItem[BlogItemKeys.Content].splice(index, 1);
        props.updateBlogItem(updatedBlogItem);
    }

    const handleAddBlogItem = () => {
        const updatedBlogItem = { ...props.blogItem };
        updatedBlogItem[BlogItemKeys.Content].push(BlogContentTypeDefaults.Text);
        props.updateBlogItem(updatedBlogItem);
    }

    return (
        <>
            {props.blogItem[BlogItemKeys.Content].map((content, index) => (
                <div
                    key={index}
                    className={classNameJoin([blogArticleContent, spacing])}
                >
                    <div className={classNameJoin([flexRow, justifyContentEnd])}>
                        <OnClickButtonComponent
                            onClick={() => handleDeleteBlogItem(index)}
                        >
                            <div className={classNameJoin([flexRow])}>
                                <img src={closeSvg} className={icon} />
                            </div>
                        </OnClickButtonComponent>
                    </div>
                    <div className={spacing}>
                        <SelectInputComponent
                            label="Blog Content Type"
                            value={content[ContentKeys.Type]}
                            options={Object.values(BlogContentType)}
                            onChange={(event) => handleUpdateBlogItem(BlogContentTypeDefaults[event.target.value as BlogContentType], index)}
                        />
                    </div>
                    <ContentSwitcher
                        blogContent={content}
                        editMode={props.editMode}
                        updateBlogContent={(blogContent) => handleUpdateBlogItem(blogContent, index)}
                    />
                </div>
            ))}
            <div className={classNameJoin([flexRow, justifyContentCenter, spacing])}>
                <OnClickButtonComponent
                    onClick={() => handleAddBlogItem()}
                >
                    <div className={classNameJoin([flexRow])}>
                        <img src={plusSvg} className={icon} />
                    </div>
                </OnClickButtonComponent>
            </div>
        </>
    )
}