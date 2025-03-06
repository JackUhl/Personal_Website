import { Children, useEffect, useState } from "react";
import IRevealComponent from "./IRevealComponent";
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";
import { revealItem, revealItemShown } from "./RevealComponent.module.css";

export default function RevealComponent(props: IRevealComponent) {
    const [revealIndex, setRevealIndex] = useState(props.introDelay ? -1 : 0);

    useEffect(() => {
        if (revealIndex < Children.count(props.children) - 1) {
            const timeoutId = setTimeout(() => {
                setRevealIndex(prevState => prevState + 1);
            }, props.timeoutInterval);

            return () => clearTimeout(timeoutId);
        }
    }, [revealIndex, props.children]);
    
    return (
        <>
            {Children.map(props.children, (child, index) => (
                <div className={ClassnameJoiner.join([revealItem, index <= revealIndex ? revealItemShown : ""])}>
                    {child}
                </div>
            ))}
        </>
    )
}