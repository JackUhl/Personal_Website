import { useState } from "react";

import checkmarkSvg from "../../assets/svg/checkmark.svg"
import linkSvg from "../../assets/svg/link.svg"
import { icon } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner/ClassnameJoiner";
import { container, linkIcon } from "./CopyLinkComponent.module.css";
import ICopyLinkComponent from "./ICopyLinkComponent";

export default function CopyLinkComponent(props: ICopyLinkComponent) {
    const [isHovering, setIsHovering] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    }

    const handleMouseOut = () => {
        setIsHovering(false);
        setIsChecked(false);
    }

    const handleOnClick = () => {
        setIsChecked(true);
        props.onClick();
    }

    return (
        <div
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            className={container}
            onClick={handleOnClick}
        >
            {props.children}
            {isHovering ? (isChecked ? <img src={checkmarkSvg} className={classNameJoin([linkIcon, icon])} /> : <img src={linkSvg} className={classNameJoin([linkIcon, icon])} />) : null}
        </div>
    )
}