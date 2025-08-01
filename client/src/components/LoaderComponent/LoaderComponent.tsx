import { alignItemsCenter, flexRow, flexWrap } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import RevealComponent from "../RevealComponent/RevealComponent";
import { loaderCircleContainer, loaderCircle } from "./LoaderComponent.module.css";

export default function LoaderComponent() {
    const numberOfCircles = 3;

    const circles = []
    for(let index = 0; index < numberOfCircles; index++) {
        circles.push(
            <div 
                className={classNameJoin([loaderCircle])}
                key={index}
            />
        )
    } 

    return (
        <>
            <div className={classNameJoin([flexRow, flexWrap, alignItemsCenter, loaderCircleContainer])}>
                <RevealComponent timeoutInterval={200} repeat={true}>
                    {circles}
                </RevealComponent>
            </div>
        </>
    )
}