import IBlogArticleContentComponent from "./IBlogArticleContentComponent";
import DisplayBlogArticleContentComponent from "./DisplayBlogArticleContentComponent/DisplayBlogArticleContentComponent";
import EditBlogArticleContentComponent from "../../../components/BlogArticleFormComponent/BlogArticleFormComponent";

export default function BlogArticleContentComponent(props: IBlogArticleContentComponent) {
    return (
        <>
            {props.editMode ? <EditBlogArticleContentComponent blogItem={props.blogItem} editMode={props.editMode} updateBlogItem={props.updateBlogItem} /> : <DisplayBlogArticleContentComponent blogItem={props.blogItem} />}
        </>
    )
}