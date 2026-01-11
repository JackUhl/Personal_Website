import { BlogContentType } from "../../models/enums/BlogContentType";
import { InputType } from "../../models/enums/InputType";
import { BlogContent, BlogItemKeys, BlogContentTypeDefaults, ContentKeys } from "../../models/objects/BlogItem";
import { MongoItemKeys } from "../../models/objects/MongoItem";
import ContentSwitcherComponent from "../ContentSwitcherComponent/ContentSwitcherComponent";
import { spacing, flexRow, justifyContentEnd, icon, justifyContentCenter } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import EditFormComponent from "../EditFormComponent/EditFormComponent";
import SelectInputComponent from "../InputComponents/SelectInputComponent/SelectInputComponent";
import OnClickButtonComponent from "../OnClickButtonComponent/OnButtonButtonComponent";
import { blogArticleContent } from "./BlogArticleFormComponent.module.css";
import IEditBlogArticleContentComponent from "./IBlogArticleFormComponent";
import plusSvg from "../../assets/svg/plus.svg";
import closeSvg from "../../assets/svg/close.svg";


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
                forms={[props.blogItem]}
                idPropertyName={MongoItemKeys._Id}
                onChange={(updatedBlogItems) => {
                    props.updateBlogItem(updatedBlogItems[0])
                }}
            />
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
                    <ContentSwitcherComponent
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