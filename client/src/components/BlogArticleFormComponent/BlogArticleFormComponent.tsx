import { BlogContentType } from "../../models/enums/BlogContentType";
import { InputType } from "../../models/enums/InputType";
import { BlogContent, BlogItemKeys, BlogContentTypeDefaults, ContentKeys } from "../../models/objects/BlogItem";
import ContentSwitcherComponent from "../ContentSwitcherComponent/ContentSwitcherComponent";
import { spacing, flexRow, flexColumn, flexGap, flexGrow, alignItemsCenter, icon, justifyContentCenter } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import EditFormComponent from "../EditFormComponent/EditFormComponent";
import SelectInputComponent from "../InputComponents/SelectInputComponent/SelectInputComponent";
import OnClickButtonComponent from "../OnClickButtonComponent/OnButtonButtonComponent";
import IBlogArticleFormComponent from "./IBlogArticleFormComponent";
import plusSvg from "../../assets/svg/plus.svg";
import arrowSvg from "../../assets/svg/arrow.svg";
import RemovableEditFormItem from "../RemovableEditFormItem/RemovableEditFormItem";
import { downArrow, upArrow } from "./BlogArticleFormComponent.module.css";


export default function BlogArticleFormComponent(props: IBlogArticleFormComponent) {
    const contents = props.blogItem[BlogItemKeys.Content];

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

    const handleMoveBlogItem = (index: number, direction: number) => {
        const targetIndex = index + direction;

        if (targetIndex < 0 || targetIndex >= contents.length) {
            return;
        }

        const updatedBlogItem = { ...props.blogItem };
        const updatedContent = [...contents];
        [updatedContent[index], updatedContent[targetIndex]] = [updatedContent[targetIndex], updatedContent[index]];
        updatedBlogItem[BlogItemKeys.Content] = updatedContent;

        props.updateBlogItem(updatedBlogItem);
    }

    const handleMoveBlogItemUp = (index: number) => {
        handleMoveBlogItem(index, -1);
    }

    const handleMoveBlogItemDown = (index: number) => {
        handleMoveBlogItem(index, 1);
    }

    return (
        <>
            <EditFormComponent
                fields={[
                    {
                        label: "Title",
                        propertyName: BlogItemKeys.Title,
                        type: InputType.Text
                    },
                    {
                        label: "Short Description",
                        propertyName: BlogItemKeys.ShortDescription,
                        type: InputType.TextArea
                    },
                    {
                        label: "Tags",
                        propertyName: BlogItemKeys.Tags,
                        type: InputType.Text
                    },
                    {
                        label: "Primary Image",
                        propertyName: BlogItemKeys.PrimaryImage,
                        type: InputType.Image
                    },
                    {
                        label: "Created Date",
                        propertyName: BlogItemKeys.CreatedDate,
                        type: InputType.Date
                    }
                ]}
                formValues={props.blogItem}
                onChange={(updatedBlogItems) => {
                    props.updateBlogItem(updatedBlogItems)
                }}
            />
            {contents.map((content, index) => (
                <div
                    key={index}
                    className={classNameJoin([flexRow, alignItemsCenter, flexGap])}
                >
                    {contents.length > 1 && <div className={classNameJoin([flexColumn, flexGap])}>
                        {index != 0 && <OnClickButtonComponent
                            onClick={() => handleMoveBlogItemUp(index)}
                        >
                            <div className={classNameJoin([flexRow])}>
                                <img src={arrowSvg} className={classNameJoin([icon, upArrow])} />
                            </div>
                        </OnClickButtonComponent>}
                        {index != contents.length - 1 && <OnClickButtonComponent
                            onClick={() => handleMoveBlogItemDown(index)}
                        >
                            <div className={classNameJoin([flexRow])}>
                                <img src={arrowSvg} className={classNameJoin([icon, downArrow])} />
                            </div>
                        </OnClickButtonComponent>}
                    </div>}
                    <div className={flexGrow}>
                        <RemovableEditFormItem
                            onClick={() => handleDeleteBlogItem(index)}
                        >
                            <div className={spacing}>
                                <SelectInputComponent
                                    label="Blog Content Type"
                                    value={content[ContentKeys.Type]}
                                    options={Object.values(BlogContentType)}
                                    onChange={(event) => handleUpdateBlogItem(BlogContentTypeDefaults[event.target.value as BlogContentType], index)}
                                />
                            </div>
                            <ContentSwitcherComponent
                                blogContent={content}
                                editMode={true}
                                updateBlogContent={(blogContent) => handleUpdateBlogItem(blogContent, index)}
                            />
                        </RemovableEditFormItem>
                    </div>
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