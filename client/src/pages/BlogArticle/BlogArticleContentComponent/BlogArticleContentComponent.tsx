import IBlogArticleContentComponent from "./IBlogArticleContentComponent";
import EditBlogArticleContentComponent from "./EditBlogArticleContentComponent/EditBlogArticleContentComponent";
import DisplayBlogArticleContentComponent from "./DisplayBlogArticleContentComponent/DisplayBlogArticleContentComponent";

export default function BlogArticleContentComponent(props: IBlogArticleContentComponent) {
    return (
        <>
            {props.editMode ? <EditBlogArticleContentComponent blogContent={props.blogContent} /> : <DisplayBlogArticleContentComponent blogContent={props.blogContent} />}
        </>
    )
}