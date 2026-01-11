import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner";
import IDisplayResourcesContentComponent from "./IDisplayResourcesContentComponent";
import { linkContent, resourcesContainer, resourcesTitle } from "./DisplayResourcesContentComponent.module.css";
import { alignItemsCenter, flexColumn, justifyContentCenter } from "../../../../styling/shared.module.css";

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