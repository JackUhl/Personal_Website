import { BlogContentType } from "../../models/enums/BlogContentType";
import { InputType } from "../../models/enums/InputType";
import { BlogContent, BlogItemKeys, BlogContentTypeDefaults, ContentKeys } from "../../models/objects/BlogItem";
import ContentSwitcherComponent from "../ContentSwitcherComponent/ContentSwitcherComponent";
import { spacing, flexRow, icon, justifyContentCenter } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import EditFormComponent from "../EditFormComponent/EditFormComponent";
import SelectInputComponent from "../InputComponents/SelectInputComponent/SelectInputComponent";
import OnClickButtonComponent from "../OnClickButtonComponent/OnButtonButtonComponent";
import IEditBlogArticleContentComponent from "./IBlogArticleFormComponent";
import plusSvg from "../../assets/svg/plus.svg";
import RemovableEditFormItem from "../RemovableEditFormItem/RemovableEditFormItem";


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
            {props.blogItem[BlogItemKeys.Content].map((content, index) => (
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
                        editMode={props.editMode}
                        updateBlogContent={(blogContent) => handleUpdateBlogItem(blogContent, index)}
                    />
                </RemovableEditFormItem>
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