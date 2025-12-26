import EditForm from "../../../../components/EditForm/EditForm";
import { InputType } from "../../../../models/enums/InputType";
import { BlogItemKeys } from "../../../../models/objects/BlogItem";
import IEditBlogArticleHeader from "./IEditBlogArticleHeader";

export default function EditBlogArticleHeader(props: IEditBlogArticleHeader) {
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
            onChange={(updatedBlogItems) => {
                props.updatedBlogItem(updatedBlogItems[0])
            }}
        />
    )
}