import { cardContainer, cardContent, cardContentDescription, cardContentTitle, cardImage, cardWrapper, underlineItem } from "./BlogCardComponent.module.css";
import IBlogCardComponent from "./IBlogCardComponent";
import { useNavigate } from "react-router-dom";
import { BlogRoute } from "../../../../models/constants/RouteConstants";
import { renderPartialDate } from "../../../../utilities/helpers/DateRenderer/DateRenderer";
import { BlogItemKeys } from "../../../../models/objects/BlogItem";
import { UploadService } from "../../../../services/UploadService/UploadService";

export default function BlogCardComponent(props: IBlogCardComponent) {
    const navigate = useNavigate();

    const navigateToBlogArticle = () => {
        navigate(BlogRoute + `/${props.blogItem[BlogItemKeys._Id]}`);
    }

    return (
        <div className={cardWrapper} data-testid="blog-card">
            <div onClick={navigateToBlogArticle} className={cardContainer}>
                <img className={cardImage} src={UploadService.GetFile(props.blogItem.primaryImage)} />
                <div className={cardContent}>
                    <p className={cardContentTitle}>{props.blogItem.title}</p>
                    <p className={underlineItem}>{renderPartialDate(new Date(props.blogItem.createdDate))}</p>
                    <p className={cardContentDescription}>{props.blogItem.shortDescription}</p>
                </div>
            </div>
        </div>
    )
}