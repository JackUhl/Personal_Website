import { alignItemsCenter, flexColumn, justifyContentCenter } from "../../../../styling/shared.module.css";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner/ClassnameJoiner";
import { linkContent, resourcesContainer, resourcesTitle } from "./DisplayResourcesContentComponent.module.css";
import IDisplayResourcesContentComponent from "./IDisplayResourcesContentComponent";

export default function DisplayResourcesContentComponent(props: IDisplayResourcesContentComponent) {
    return (
        <div className={classNameJoin([flexColumn, justifyContentCenter, alignItemsCenter, resourcesContainer])}>
            <span className={resourcesTitle}>Resources</span>
            {props.resources.map((resource, index) => (
                <div key={index}>
                    <a href={resource.link} target="_blank" className={linkContent}>{resource.resource}</a>
                </div>
            ))}
        </div>
    );
}