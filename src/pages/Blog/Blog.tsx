import BlogCardComponent from "../../components/BlogComponent/BlogCardComponent";
import { useFetch } from "../../hooks/useFetch";
import { LoadingState } from "../../models/enums/LoadingState";
import { PersonalSiteService } from "../../services/PersonalSiteService";
import { flexColumn, justifyContentCenter, rowGap } from "../../styling/shared.module.css";
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";
import { Loading } from "../Loading/Loading";
import { blogCardShadow, blogContainer } from "./Blog.module.css";

export default function Blog() {
    const fetch = useFetch(PersonalSiteService.GetBlog());

    if(fetch.loadingState == LoadingState.loading) {
        return <Loading/>
    }

    const response = fetch.response;

    return (
        <div className={ClassnameJoiner.join([flexColumn, justifyContentCenter, rowGap, blogContainer])}>
            {response?.map((blogItem, index) => (
                <div className={blogCardShadow}>
                    <BlogCardComponent blogItem={blogItem} key={index}/>
                </div>
            ))}
        </div>
    )
}