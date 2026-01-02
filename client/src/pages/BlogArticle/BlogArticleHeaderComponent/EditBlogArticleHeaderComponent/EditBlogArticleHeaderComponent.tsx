import EditForm from "../../../../components/EditForm/EditForm";
import { InputType } from "../../../../models/enums/InputType";
import { BlogItemKeys } from "../../../../models/objects/BlogItem";
import { MongoItemKeys } from "../../../../models/objects/MongoItem";
import IEditBlogArticleHeaderComponent from "./IEditBlogArticleHeaderComponent";

export default function EditBlogArticleHeaderComponent(props: IEditBlogArticleHeaderComponent) {
    return (
        <EditForm
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
                props.updatedBlogItem(updatedBlogItems[0])
            }}
        />
    )
}