import { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom"

import cancelSvg from "../../assets/svg/close.svg";
import editSvg from "../../assets/svg/edit.svg";
import saveSvg from "../../assets/svg/save.svg";
import BlogArticleFormComponent from "../../components/BlogArticleFormComponent/BlogArticleFormComponent";
import OnClickButtonComponent from "../../components/OnClickButtonComponent/OnButtonButtonComponent";
import RevealComponent from "../../components/RevealComponent/RevealComponent";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { useFetch } from "../../hooks/useFetch/useFetch";
import { useHeartbeat } from "../../hooks/useHeatbeat/useHeartbeat";
import { useIsMobile } from "../../hooks/useIsMobile/useIsMobile";
import { LoadingState } from "../../models/enums/LoadingState";
import { BlogItem } from "../../models/objects/BlogItem";
import { BlogService } from "../../services/BlogService/BlogService";
import { alignItemsCenter, columnGap, flexRow, icon, justifyContentCenter, justifyContentEnd } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner/ClassnameJoiner";
import { deepCopy } from "../../utilities/helpers/Cloning/Cloning";
import Failed from "../Failed/Failed";
import Loading from "../Loading/Loading";
import { desktopBlogArticleContainer, errorText, mobileBlogArticleContainer } from "./BlogArticle.module.css";
import DisplayBlogArticleContentComponent from "./DisplayBlogArticleContentComponent/DisplayBlogArticleContentComponent";

export default function BlogArticle() {
    const { id } = useParams();
    const [editMode, setEditMode] = useState(false);
    const [blogItem, setBlogItem] = useState<BlogItem | undefined>(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [failedSubmit, setFailedSubmit] = useState(false);

    const serviceCall = useMemo(() => BlogService.GetBlog(id), [id]);
    const { response, loadingState } = useFetch(serviceCall);
    const isMobile = useIsMobile();
    const { hash } = useLocation();

    const isAdmin = useContext(AuthenticationContext);
    useHeartbeat(isAdmin && editMode);

    useEffect(() => {
        if (loadingState == LoadingState.success && response) {
            setBlogItem(deepCopy(response));
        }
    }, [hash, loadingState, response]);

    // Scroll to the fragment identifier specified in the URL
    useEffect(() => {
        if (hash != "" && blogItem) {
            const hashElement = document.querySelector(hash);

            if (hashElement) {
                hashElement.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }, [blogItem, hash])

    const handleEditClick = () => {
        setEditMode(true);
    }

    const handleCancelClick = () => {
        setBlogItem(deepCopy(response));
        setEditMode(false);
    }

    const handleSaveClick = () => {
        setFailedSubmit(false);

        if (!id || !blogItem) {
            return;
        }

        setIsSubmitting(true);
        const { _id, ...mutateBlogItem } = blogItem;
        BlogService.PutBlog(id as string, mutateBlogItem).then((response) => {
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
                        {editMode ? <BlogArticleFormComponent blogItem={blogItem} updateBlogItem={setBlogItem} /> : <DisplayBlogArticleContentComponent blogItem={blogItem} />}
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