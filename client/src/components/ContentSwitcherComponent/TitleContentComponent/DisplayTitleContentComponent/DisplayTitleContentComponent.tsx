import { useMemo, useState } from "react";

import checkmarkSvg from "../../../../assets/svg/checkmark.svg"
import linkSvg from "../../../../assets/svg/link.svg";
import { alignItemsCenter, flexRow, icon, justifyContentCenter } from "../../../../styling/shared.module.css";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner/ClassnameJoiner";
import { linkIcon, title, titleContainer } from "./DisplayTitleContentComponent.module.css";
import IDisplayTitleContentComponent from "./IDisplayTitleContentComponent";

export default function DisplayTitleContentComponent(props: IDisplayTitleContentComponent) {
    const [isHovering, setIsHovering] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const elementId = useMemo(() => {
        const normalizedTitle = props.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s_-]/g, "")
            .replace(/\s+/g, "_")
            .replace(/_+/g, "_");

        return normalizedTitle || "section";
    }, [props.title]);

    const handleTitleClick = () => {
        setIsChecked(true);
        const fragmentIndex = window.location.href.indexOf('#');
        if(fragmentIndex != -1) {
            navigator.clipboard.writeText(`${window.location.href.substring(0, fragmentIndex)}#${elementId}`);
        }
        else {
            navigator.clipboard.writeText(`${window.location.href}#${elementId}`);
        }
    }

    const handleMouseOver = () => {
        setIsHovering(true);
    }

    const handleMouseOut = () => {
        setIsHovering(false);
        setIsChecked(false);
    }

    return (
        <div className={classNameJoin([flexRow, justifyContentCenter, alignItemsCenter])}>
            <div
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                className={titleContainer}
            >
                <p
                    id={elementId}
                    onClick={handleTitleClick}
                    className={title}
                >
                    {props.title}
                </p>
                {isHovering ? (isChecked ? <img src={checkmarkSvg} className={classNameJoin([linkIcon, icon])} /> : <img src={linkSvg} className={classNameJoin([linkIcon, icon])} />) : null}
            </div>
        </div>
    );
}