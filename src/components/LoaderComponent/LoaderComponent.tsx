import { useEffect, useState } from "react";
import { alignItemsCenter, flexRow, flexWrap } from "../../styling/shared.module.css";
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";
import { loaderCircleContainer, loaderCircle, smallerSize, largerSize } from "./LoaderComponent.module.css";

export default function LoaderComponent() {
    const [loaderIndex, setLoaderIndex] = useState(0);
    const numberOfCircles = 3;
    const numberOfFrames = numberOfCircles + 1;
    const delay = 200

    useEffect(() => {
        setTimeout(() => {
            setLoaderIndex((loaderIndex + 1) % numberOfFrames)
        }, delay)
    }, [loaderIndex])

    const circles = []
    for(let index = 1; index <= numberOfCircles; index++) {
        circles.push(
            <div 
                className={ClassnameJoiner.join([loaderCircle, index > loaderIndex ? largerSize : smallerSize])}
                key={index}
            />
        )
    } 

    return (
        <>
            <div className={ClassnameJoiner.join([flexRow, flexWrap, alignItemsCenter, loaderCircleContainer])}>
                {circles}
            </div>
        </>
    )
}