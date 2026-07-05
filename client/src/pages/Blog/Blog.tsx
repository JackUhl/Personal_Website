import { useContext, useEffect, useMemo, useState } from "react";

import closeSvg from "../../assets/svg/close.svg";
import plusSvg from "../../assets/svg/plus.svg";
import saveSvg from "../../assets/svg/save.svg";
import BlogArticleFormComponent from "../../components/BlogArticleFormComponent/BlogArticleFormComponent";
import OnClickButtonComponent from "../../components/OnClickButtonComponent/OnButtonButtonComponent";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { useFetch } from "../../hooks/useFetch/useFetch";
import { useHeartbeat } from "../../hooks/useHeatbeat/useHeartbeat";
import { useIsMobile } from "../../hooks/useIsMobile/useIsMobile";
import { LoadingState } from "../../models/enums/LoadingState";
import { BlogItem, BlogItemKeys,defaultMutateBlogItem, MutateBlogItem } from "../../models/objects/BlogItem";
import { BlogService } from "../../services/BlogService/BlogService";
import { alignItemsCenter, columnGap, flexRow, icon, justifyContentCenter,justifyContentEnd, spacing } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner/ClassnameJoiner";
import { deepCopy } from "../../utilities/helpers/Cloning/Cloning";
import Failed from "../Failed/Failed";
import Loading from "../Loading/Loading";
import { desktopBlogContainer, errorText,mobileBlogContainer } from "./Blog.module.css";
import DisplayBlogComponent from "./DisplayBlogComponent/DisplayBlogComponent";

export default function Blog() {
    const [allBlogItems, setAllBlogItems] = useState<BlogItem[]>([]);
    const [createBlogItem, setCreateBlogItem] = useState<MutateBlogItem>(defaultMutateBlogItem);
    const [editMode, setEditMode] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [failedSubmit, setFailedSubmit] = useState(false);

    const isMobile = useIsMobile();
    const serviceCall = useMemo(() => BlogService.GetAllBlogs(), []);
    const { response, loadingState } = useFetch(serviceCall);
    const isAdmin = useContext(AuthenticationContext);
    useHeartbeat(isAdmin && editMode);

    useEffect(() => {
        if (loadingState == LoadingState.success && response) {
            setAllBlogItems(deepCopy(response));
        }
    }, [loadingState, response]);

    if (loadingState == LoadingState.loading) {
        return <Loading />
    }

    if (loadingState == LoadingState.failed) {
        return <Failed />
    }

    const handleAddBlog = () => {
        setCreateBlogItem(deepCopy(defaultMutateBlogItem));
        setEditMode(true);
    }

    const handleCancelClick = () => {
        setCreateBlogItem(deepCopy(defaultMutateBlogItem));
        setEditMode(false);
        setFailedSubmit(false);
    }

    const handleSaveClick = async () => {
        setFailedSubmit(false);
        setIsSubmitting(true);
        BlogService.PostBlog(createBlogItem).then((response) => {
            setAllBlogItems([response.data, ...allBlogItems]);
            setEditMode(false);
        }).catch(() => {
            setFailedSubmit(true);
        }).finally(() => {
            setIsSubmitting(false);
        });
    }

    const handleDeleteClick = async (id: string) => {
        BlogService.DeleteBlog(id).then(() => {
            const newAllBlogItems = allBlogItems.filter((blogItem) => blogItem[BlogItemKeys._Id] != id)
            setAllBlogItems(newAllBlogItems);
        })
    }

    return (
        <div className={isMobile ? mobileBlogContainer : desktopBlogContainer}>
            {isAdmin && !editMode &&
                <div className={classNameJoin([flexRow, justifyContentEnd, spacing])}>
                    <OnClickButtonComponent
                        onClick={handleAddBlog}
                    >
                        <div className={classNameJoin([flexRow, alignItemsCenter])}>
                            <img src={plusSvg} className={icon} />
                            <span>Add Blog Post</span>
                        </div>
                    </OnClickButtonComponent>
                </div>
            }
            {editMode ? <BlogArticleFormComponent blogItem={createBlogItem as BlogItem} updateBlogItem={setCreateBlogItem} /> : <DisplayBlogComponent allBlogs={allBlogItems} deleteBlog={handleDeleteClick} />}
            {isAdmin && editMode &&
                <div>
                    <div className={classNameJoin([flexRow, justifyContentEnd, columnGap])}>
                        <OnClickButtonComponent
                            onClick={handleCancelClick}
                        >
                            <div className={classNameJoin([flexRow, alignItemsCenter])}>
                                <img src={closeSvg} className={icon} />
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
                            <p className={errorText}>Error submitting blog post</p>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}