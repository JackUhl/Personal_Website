import { useParams } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch";
import { BlogService } from "../../services/BlogService";
import { LoadingState } from "../../models/enums/LoadingState";
import Loading from "../Loading/Loading";
import { useContext, useEffect, useMemo, useState } from "react";
import { desktopBlogArticleContainer, errorText, mobileBlogArticleContainer } from "./BlogArticle.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import { alignItemsCenter, columnGap, flexRow, icon, justifyContentCenter, justifyContentEnd } from "../../styling/shared.module.css";
import RevealComponent from "../../components/RevealComponent/RevealComponent";
import Failed from "../Failed/Failed";
import { useIsMobile } from "../../hooks/useIsMobile";
import OnClickButtonComponent from "../../components/OnClickButtonComponent/OnButtonButtonComponent";
import { deepCopy } from "../../utilities/helpers/Cloning";
import editSvg from "../../assets/svg/edit.svg";
import cancelSvg from "../../assets/svg/close.svg";
import saveSvg from "../../assets/svg/save.svg";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import BlogArticleFormComponent from "../../components/BlogArticleFormComponent/BlogArticleFormComponent";
import DisplayBlogArticleContentComponent from "./DisplayBlogArticleContentComponent/DisplayBlogArticleContentComponent";
import { BlogItem } from "../../models/objects/BlogItem";

export default function BlogArticle() {
    const { id } = useParams();
    const [editMode, setEditMode] = useState(false);
    const [blogItem, setBlogItem] = useState<BlogItem | undefined>(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [failedSubmit, setFailedSubmit] = useState(false);

    const serviceCall = useMemo(() => BlogService.GetBlog(id), [id]);
    const { response, loadingState } = useFetch(serviceCall);
    const isMobile = useIsMobile();
    const isAdmin = useContext(AuthenticationContext);

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
        setFailedSubmit(false);
        setIsSubmitting(true);
        BlogService.PutBlog(id as string, blogItem as BlogItem).then((response) => {
            setBlogItem(response.data)
            setEditMode(false);
        }).catch(() => {
            setFailedSubmit(true);
        }).finally(() => {
            setIsSubmitting(false);
        });
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
                                <img src={editSvg} className={icon} />
                                <span>Edit Blog Article</span>
                            </div>
                        </OnClickButtonComponent>
                    </div>
                }
                {blogItem &&
                    <>
                        {editMode ? <BlogArticleFormComponent blogItem={blogItem} editMode={true} updateBlogItem={setBlogItem} /> : <DisplayBlogArticleContentComponent blogItem={blogItem} />}
                    </>
                }
                {isAdmin && editMode &&
                    <div>
                        <div className={classNameJoin([flexRow, justifyContentEnd, columnGap])}>
                            <OnClickButtonComponent
                                onClick={handleCancelClick}
                            >
                                <div className={classNameJoin([flexRow, alignItemsCenter])}>
                                    <img src={cancelSvg} className={icon} />
                                    <span>Cancel</span>
                                </div>
                            </OnClickButtonComponent>
                            <OnClickButtonComponent
                                onClick={handleSaveClick}
                                isSubmitting={isSubmitting}
                            >
                                <div className={classNameJoin([flexRow, alignItemsCenter])}>
                                    <img src={saveSvg} className={icon} />
                                    <span>Save</span>
                                </div>
                            </OnClickButtonComponent>
                        </div>
                        {failedSubmit && (
                            <div className={classNameJoin([flexRow, justifyContentCenter, alignItemsCenter])}>
                                <p className={errorText}>Error editing blog post</p>
                            </div>
                        )}
                    </div>
                }
            </RevealComponent>
        </div>
    )
}