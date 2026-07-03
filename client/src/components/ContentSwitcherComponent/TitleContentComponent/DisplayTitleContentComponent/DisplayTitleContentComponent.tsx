import { useMemo, useState } from "react";
import { alignItemsCenter, flexRow, icon, justifyContentCenter } from "../../../../styling/shared.module.css";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner/ClassnameJoiner";
import { linkIcon, title, titleContainer } from "./DisplayTitleContentComponent.module.css";
import IDisplayTitleContentComponent from "./IDisplayTitleContentComponent";
import linkSvg from "../../../../assets/svg/link.svg";

export default function DisplayTitleContentComponent(props: IDisplayTitleContentComponent) {
    const [isHovering, setIsHovering] = useState(false);

    const elementId = useMemo(() => {
        return props.title.toLowerCase().trim().replace(/\s+/g, "_");
    }, [props.title]);

    const handleTitleClick = () => {
        navigator.clipboard.writeText(`${window.location.href}#${elementId}`);
    }

    return (
        <div className={classNameJoin([flexRow, justifyContentCenter, alignItemsCenter])}>
            <div
                onMouseOver={() => setIsHovering(true)}
                onMouseOut={() => setIsHovering(false)}
                className={titleContainer}
            >
                <p
                    id={elementId}
                    onClick={handleTitleClick}
                    className={title}
                >
                    {props.title}
                </p>
                {isHovering && <img src={linkSvg} className={classNameJoin([linkIcon, icon])} />}
            </div>
        </div>
    );
}