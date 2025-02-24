import { flexRow } from "../../styling/shared.module.css";
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";
import DateRenderer from "../../utilities/helpers/DateRenderer";
import { cardContainer, cardContent, cardContentDate, cardContentDescription, cardContentTitle, cardImage } from "./BlogCardComponent.module.css";
import { IBlogCardComponent } from "./IBlogCardComponent";

export default function BlogCardComponent(props: IBlogCardComponent) {
    return (
        <div className={ClassnameJoiner.join([flexRow, cardContainer])}>
            <img className={cardImage} src={props.blogItem.primaryImage} />
            <div className={cardContent}>
                <p className={cardContentTitle}>{props.blogItem.title}</p>
                <p className={cardContentDate}>{DateRenderer.renderPartialDate(props.blogItem.createdDate)}</p>
                <p className={cardContentDescription}>{props.blogItem.shortDescription}</p>
            </div>
        </div>
    )
}