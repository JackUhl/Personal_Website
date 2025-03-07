import { Children, useEffect, useState } from "react";
import IRevealComponent from "./IRevealComponent";
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";
import { displayInline, revealAnimation, revealItem, revealItemShown } from "./RevealComponent.module.css";

export default function RevealComponent(props: IRevealComponent) {
    const startIndex = -1
    const [revealIndex, setRevealIndex] = useState(startIndex);

    useEffect(() => {
        if (revealIndex <= Children.count(props.children) - 1) {
            setTimeout(() => {
                setRevealIndex(prevState => prevState + 1);
            }, props.timeoutInterval);
        }
        else if(props.repeat && revealIndex == Children.count(props.children)){
            setRevealIndex(startIndex);
        }
    }, [revealIndex, props.children]);
    
    return (
        <>
            {Children.map(props.children, (child, index) => (
                <div className={ClassnameJoiner.join([revealItem, props.displayInline ? displayInline : "", props.noAnimation ? "" : revealAnimation,  index <= revealIndex ? revealItemShown : ""])}>
                    {child}
                </div>
            ))}
        </>
    )
}