import { useContext, useEffect, useMemo, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { LoadingState } from "../../models/enums/LoadingState";
import { BlogService } from "../../services/BlogService";
import Loading from "../Loading/Loading";
import { mobileBlogContainer, desktopBlogContainer } from "./Blog.module.css";
import Failed from "../Failed/Failed";
import { BlogItem, defaultBlogItem } from "../../models/objects/BlogItem";
import { useIsMobile } from "../../hooks/useIsMobile";
import EditBlogArticleContentComponent from "../BlogArticle/BlogArticleContentComponent/EditBlogArticleContentComponent/EditBlogArticleContentComponent";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import OnClickButtonComponent from "../../components/OnClickButtonComponent/OnButtonButtonComponent";
import { flexRow, justifyContentEnd, alignItemsCenter, columnGap, icon, spacing } from "../../styling/shared.module.css";
import plusSvg from "../../assets/svg/plus.svg";
import closeSvg from "../../assets/svg/close.svg";
import saveSvg from "../../assets/svg/save.svg";
import DisplayBlogComponent from "./DisplayBlogComponent/DisplayBlogComponent";
import { deepCopy } from "../../utilities/helpers/Cloning";

export default function Blog() {
    const [allBlogItems, setAllBlogItems] = useState<BlogItem[]>([]);
    const [createBlogItem, setCreateBlogItem] = useState<BlogItem>(defaultBlogItem);
    const [editMode, setEditMode] = useState(false);

    const isMobile = useIsMobile();
    const serviceCall = useMemo(() => BlogService.GetAllBlogs(), []);
    const { response, loadingState } = useFetch(serviceCall);
    const isAdmin = useContext(AuthenticationContext);

    useEffect(() => {
        if(loadingState == LoadingState.success && response) {
            setAllBlogItems(deepCopy(response))
        }
    }, [loadingState, response]);

    if (loadingState == LoadingState.loading) {
        return <Loading />
    }

    if (loadingState == LoadingState.failed) {
        return <Failed />
    }

    const handleAddBlog = () => {
        setCreateBlogItem(deepCopy(defaultBlogItem));
        setEditMode(true);
    }

    const handleCancelClick = () => {
        setCreateBlogItem(deepCopy(defaultBlogItem));
        setEditMode(false);
    }

    const handleSaveClick = () => {
        setAllBlogItems([createBlogItem, ...allBlogItems])
        setEditMode(false);
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
            {editMode ? <EditBlogArticleContentComponent blogItem={createBlogItem} editMode={true} updateBlogItem={setCreateBlogItem} /> : <DisplayBlogComponent allBlogs={allBlogItems} />}
            {isAdmin && editMode &&
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
                    >
                        <div className={classNameJoin([flexRow, alignItemsCenter])}>
                            <img src={saveSvg} className={icon} />
                            <span>Save</span>
                        </div>
                    </OnClickButtonComponent>
                </div>
            }
        </div>
    )
}