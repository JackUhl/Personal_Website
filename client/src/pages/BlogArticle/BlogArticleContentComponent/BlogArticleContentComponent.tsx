import IBlogArticleContentComponent from "./IBlogArticleContentComponent";
import EditBlogArticleContentComponent from "./EditBlogArticleContentComponent/EditBlogArticleContentComponent";
import DisplayBlogArticleContentComponent from "./DisplayBlogArticleContentComponent/DisplayBlogArticleContentComponent";

export default function BlogArticleContentComponent(props: IBlogArticleContentComponent) {
    return (
        <>
            {props.editMode ? <EditBlogArticleContentComponent blogItem={props.blogItem} editMode={props.editMode} updateBlogItem={props.updateBlogItem} /> : <DisplayBlogArticleContentComponent blogItem={props.blogItem} />}
        </>
    )
}