import DisplayBlogArticleHeaderComponent from "./DisplayBlogArticleHeaderComponent/DisplayBlogArticleHeaderComponent";
import EditBlogArticleHeaderComponent from "./EditBlogArticleHeaderComponent/EditBlogArticleHeaderComponent";
import IBlogArticleHeaderComponent from "./IBlogArticleHeaderComponent";

export default function BlogArticleHeaderComponent(props: IBlogArticleHeaderComponent) {
    return (
        <>
            {props.editMode ? <EditBlogArticleHeaderComponent blogItem={props.blogItem} updatedBlogItem={props.updateBlogItem} /> : <DisplayBlogArticleHeaderComponent blogItem={props.blogItem} />}
        </>
    )
}