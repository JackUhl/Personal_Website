import { useContext, useEffect, useMemo, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { LoadingState } from "../../models/enums/LoadingState";
import { BlogService } from "../../services/BlogService";
import Loading from "../Loading/Loading";
import { mobileBlogContainer, desktopBlogContainer, errorText } from "./Blog.module.css";
import Failed from "../Failed/Failed";
import { BlogItem, defaultCreateBlogItem, BlogItemKeys, CreateBlogItem } from "../../models/objects/BlogItem";
import { useIsMobile } from "../../hooks/useIsMobile";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import OnClickButtonComponent from "../../components/OnClickButtonComponent/OnButtonButtonComponent";
import { flexRow, justifyContentEnd, alignItemsCenter, columnGap, icon, spacing, justifyContentCenter } from "../../styling/shared.module.css";
import plusSvg from "../../assets/svg/plus.svg";
import closeSvg from "../../assets/svg/close.svg";
import saveSvg from "../../assets/svg/save.svg";
import DisplayBlogComponent from "./DisplayBlogComponent/DisplayBlogComponent";
import { deepCopy } from "../../utilities/helpers/Cloning";
import BlogArticleFormComponent from "../../components/BlogArticleFormComponent/BlogArticleFormComponent";

export default function Blog() {
    const [allBlogItems, setAllBlogItems] = useState<BlogItem[]>([]);
    const [createBlogItem, setCreateBlogItem] = useState<CreateBlogItem>(defaultCreateBlogItem);
    const [editMode, setEditMode] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [failedSubmit, setFailedSubmit] = useState(false);

    const isMobile = useIsMobile();
    const serviceCall = useMemo(() => BlogService.GetAllBlogs(), []);
    const { response, loadingState } = useFetch(serviceCall);
    const isAdmin = useContext(AuthenticationContext);

    useEffect(() => {
        if (loadingState == LoadingState.success && response) {
            response.sort((a, b) => {
                const dateA = new Date(a[BlogItemKeys.CreatedDate]).getTime();
                const dateB = new Date(b[BlogItemKeys.CreatedDate]).getTime();
                return dateB - dateA;
            })
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
        setCreateBlogItem(deepCopy(defaultCreateBlogItem));
        setEditMode(true);
    }

    const handleCancelClick = () => {
        setCreateBlogItem(deepCopy(defaultCreateBlogItem));
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
            {editMode ? <BlogArticleFormComponent blogItem={createBlogItem as BlogItem} editMode={true} updateBlogItem={setCreateBlogItem} /> : <DisplayBlogComponent allBlogs={allBlogItems} />}
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