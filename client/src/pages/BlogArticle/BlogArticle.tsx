import { useParams } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch";
import { BlogService } from "../../services/BlogService";
import { LoadingState } from "../../models/enums/LoadingState";
import Loading from "../Loading/Loading";
import { useEffect, useMemo, useState } from "react";
import { button, desktopBlogArticleContainer, mobileBlogArticleContainer } from "./BlogArticle.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import { alignItemsCenter, columnGap, flexRow, justifyContentEnd } from "../../styling/shared.module.css";
import RevealComponent from "../../components/RevealComponent/RevealComponent";
import Failed from "../Failed/Failed";
import { useIsMobile } from "../../hooks/useIsMobile";
import BlogArticleContentComponent from "./BlogArticleContentComponent/BlogArticleContentComponent";
import { useAuthentication } from "../../hooks/useAuthentication";
import OnClickButtonComponent from "../../components/OnClickButtonComponent/OnButtonButtonComponent";
import { deepCopy } from "../../utilities/helpers/Cloning";
import { BlogItem } from "../../models/objects/BlogItem";
import editSvg from "../../assets/svg/edit.svg";
import cancelSvg from "../../assets/svg/close.svg";
import saveSvg from "../../assets/svg/save.svg";
import BlogArticleHeaderComponent from "./BlogArticleHeaderComponent/BlogArticleHeaderComponent";

export default function BlogArticle() {
    const { id } = useParams();
    const [editMode, setEditMode] = useState(false);
    const [blogItem, setBlogItem] = useState<BlogItem | undefined>(undefined);

    const serviceCall = useMemo(() => BlogService.GetBlog(id), [id]);
    const { response, loadingState } = useFetch(serviceCall);
    const isMobile = useIsMobile();
    const isAdmin = useAuthentication();

    useEffect(() => {
        if (loadingState == LoadingState.success && response) {
            setBlogItem(deepCopy(response));
        }
    }, [loadingState, response]);

    const handleEditClick = () => {
        setEditMode(true);
    }

    const handleCancelClick = () => {
        setBlogItem(deepCopy(response));
        setEditMode(false);
    }

    const handleSaveClick = () => {
        setEditMode(false);
        console.log(blogItem);
    }

    if (loadingState == LoadingState.loading) {
        return <Loading />
    }

    if (loadingState == LoadingState.failed) {
        return <Failed />
    }

    return (
        <div className={isMobile ? mobileBlogArticleContainer : desktopBlogArticleContainer}>
            <RevealComponent>
                {isAdmin && !editMode &&
                    <div className={classNameJoin([flexRow, justifyContentEnd])}>
                        <OnClickButtonComponent
                            onClick={handleEditClick}
                        >
                            <div className={classNameJoin([flexRow, alignItemsCenter])}>
                                <img src={editSvg} className={button} />
                                <span>Edit Blog Article</span>
                            </div>
                        </OnClickButtonComponent>
                    </div>
                }
                {blogItem &&
                    <>
                        <BlogArticleHeaderComponent
                            blogItem={blogItem}
                            editMode={editMode}
                            updateBlogItem={setBlogItem}
                        />
                        <BlogArticleContentComponent
                            blogContent={blogItem.content}    
                            editMode={editMode}                    
                        />
                    </>
                }
                {isAdmin && editMode &&
                    <div className={classNameJoin([flexRow, justifyContentEnd, columnGap])}>
                        <OnClickButtonComponent
                            onClick={handleCancelClick}
                        >
                            <div className={classNameJoin([flexRow, alignItemsCenter])}>
                                <img src={cancelSvg} className={button} />
                                <span>Cancel</span>
                            </div>
                        </OnClickButtonComponent>
                        <OnClickButtonComponent
                            onClick={handleSaveClick}
                        >
                            <div className={classNameJoin([flexRow, alignItemsCenter])}>
                                <img src={saveSvg} className={button} />
                                <span>Save</span>
                            </div>
                        </OnClickButtonComponent>
                    </div>
                }
            </RevealComponent>
        </div>
    )
}