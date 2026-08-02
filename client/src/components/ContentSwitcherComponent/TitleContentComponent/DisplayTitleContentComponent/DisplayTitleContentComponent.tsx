import { useMemo } from "react";

import { alignItemsCenter, flexRow, justifyContentCenter } from "../../../../styling/shared.module.css";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner/ClassnameJoiner";
import CopyLinkComponent from "../../../CopyLinkComponent/CopyLinkComponent";
import { title } from "./DisplayTitleContentComponent.module.css";
import IDisplayTitleContentComponent from "./IDisplayTitleContentComponent";

export default function DisplayTitleContentComponent(props: IDisplayTitleContentComponent) {
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
        const fragmentIndex = window.location.href.indexOf('#');
        if(fragmentIndex != -1) {
            navigator.clipboard.writeText(`${window.location.href.substring(0, fragmentIndex)}#${elementId}`);
        }
        else {
            navigator.clipboard.writeText(`${window.location.href}#${elementId}`);
        }
    }

    return (
        <div className={classNameJoin([flexRow, justifyContentCenter, alignItemsCenter])}>
            <CopyLinkComponent
                onClick={handleTitleClick}
            >
                <p
                    id={elementId}
                    className={title}
                >
                    {props.title}
                </p>
            </CopyLinkComponent>
        </div>
    );
}