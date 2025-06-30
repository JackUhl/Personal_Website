import { Children, useEffect, useState } from "react";
import IRevealComponent from "./IRevealComponent";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import { displayInline, revealAnimation, revealItem, revealItemShown } from "./RevealComponent.module.css";

export default function RevealComponent(props: IRevealComponent) {
    const childrenCount = Children.count(props.children);
    
    const [revealIndex, setRevealIndex] = useState(props.noReveal ? childrenCount : -1);

    useEffect(() => {
        if (revealIndex <= childrenCount - 1) {
            const timeoutId = setTimeout(() => {
                setRevealIndex(prevState => prevState + 1);
            }, props.timeoutInterval ?? 100);

            return () => clearTimeout(timeoutId);
        }
        else if(props.repeat && revealIndex == childrenCount){
            setRevealIndex(-1);
        }
    }, [revealIndex, props.children]);
    
    return (
        <>
            {Children.map(props.children, (child, index) => (
                <div key={index} className={classNameJoin([revealItem, props.displayInline ? displayInline : "", props.noAnimation ? "" : revealAnimation,  index <= revealIndex ? revealItemShown : ""])}>
                    {child}
                </div>
            ))}
        </>
    )
}