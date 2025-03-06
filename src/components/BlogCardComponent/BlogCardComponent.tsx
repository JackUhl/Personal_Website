import { useEffect, useRef, useState } from "react";
import { flexColumn, flexRow } from "../../styling/shared.module.css";
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";
import DateRenderer from "../../utilities/helpers/DateRenderer";
import { cardContainer, cardContent, cardContentDescription, cardContentTitle, cardImageSide, cardImageStacked, underlineItem } from "./BlogCardComponent.module.css";
import { IBlogCardComponent } from "./IBlogCardComponent";

const stackedThreshold = 525;

export default function BlogCardComponent(props: IBlogCardComponent) {
    const [stackedView, setStackedView] = useState(false);
    const componentRef = useRef(null);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
          if (componentRef.current) {
            setStackedView(componentRef.current.offsetWidth <= stackedThreshold);
          }
        });
    
        if (componentRef.current) {
          resizeObserver.observe(componentRef.current);
        }
      }, []);
    
    return (
        <div ref={componentRef} className={ClassnameJoiner.join([stackedView ? flexColumn : flexRow, cardContainer])}>
            <img className={stackedView ? cardImageStacked : cardImageSide} src={props.blogItem.primaryImage} />
            <div className={cardContent}>
                <p className={cardContentTitle}>{props.blogItem.title}</p>
                <p className={underlineItem}>{DateRenderer.renderPartialDate(props.blogItem.createdDate)}</p>
                <p className={cardContentDescription}>{props.blogItem.shortDescription}</p>
            </div>
        </div>
    )
}