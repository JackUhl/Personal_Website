import DisplayBlogArticleHeader from "./DisplayBlogArticleHeader/DisplayBlogArticleHeader";
import EditBlogArticleHeader from "./EditBlogArticleHeader/EditBlogArticleHeader";
import IBlogArticleHeader from "./IBlogArticleHeader";

export default function BlogArticleHeader(props: IBlogArticleHeader) {
    return (
        <>
            {props.editMode ? <EditBlogArticleHeader blogItem={props.blogItem} updatedBlogItem={props.updateBlogItem} /> : <DisplayBlogArticleHeader blogItem={props.blogItem} />}
        </>
    )
}