import { useEffect, useRef, useState } from "react";
import { flexColumn, flexRow } from "../../styling/shared.module.css";
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";
import DateRenderer from "../../utilities/helpers/DateRenderer";
import { cardContainer, cardContent, cardContentDescription, cardContentTitle, cardImageSide, cardImageStacked, underlineItem } from "./BlogCardComponent.module.css";
import { IBlogCardComponent } from "./IBlogCardComponent";
import { useNavigate } from "react-router-dom";
import { BlogRoute } from "../../models/constants/InternalUrlConstants";

const stackedThreshold = 525;

export default function BlogCardComponent(props: IBlogCardComponent) {
    const [stackedView, setStackedView] = useState(false);
    const componentRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
          if (componentRef.current) {
            const htmlElement = componentRef.current as HTMLElement
            setStackedView(htmlElement.offsetWidth <= stackedThreshold);
          }
        });
    
        if (componentRef.current) {
          resizeObserver.observe(componentRef.current);
        }
      }, []);

    const navigateToBlogArticle = () => {
      navigate(BlogRoute + `/${props.blogItem.id}`);
    }
    
    return (
      <div ref={componentRef} onClick={navigateToBlogArticle} className={ClassnameJoiner.join([stackedView ? flexColumn : flexRow, cardContainer])}>
        <img className={stackedView ? cardImageStacked : cardImageSide} src={props.blogItem.primaryImage} />
        <div className={cardContent}>
            <p className={cardContentTitle}>{props.blogItem.title}</p>
            <p className={underlineItem}>{DateRenderer.renderPartialDate(props.blogItem.createdDate)}</p>
            <p className={cardContentDescription}>{props.blogItem.shortDescription}</p>
        </div>
      </div>
    )
}