import OnClickButtonComponent from "../../../../components/OnClickButtonComponent/OnButtonButtonComponent";
import { BlogContent, BlogItemKeys, defaultTextContent } from "../../../../models/objects/BlogItem";
import { flexRow, justifyContentCenter, justifyContentEnd } from "../../../../styling/shared.module.css";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner";
import ContentSwitcher from "../ContentSwitcher";
import IEditBlogArticleContentComponent from "./IEditBlogArticleContentComponent";
import closeSvg from "../../../../assets/svg/close.svg"
import plusSvg from "../../../../assets/svg/plus.svg"
import { blogArticleContent, icon, spacing } from "./EditBlogArticleContentComponent.module.css";

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
        updatedBlogItem[BlogItemKeys.Content].push(defaultTextContent);
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