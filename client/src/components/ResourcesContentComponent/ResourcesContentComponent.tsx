import { alignItemsCenter, flexColumn, justifyContentCenter } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import IResourcesContentComponent from "./IResourcesContentComponent";
import { linkContent, resourcesTitle } from "./ResourcesContentComponent.module.css";

export default function ResourcesContentComponent(props: IResourcesContentComponent) {
    return (
        <div className={classNameJoin([flexColumn, justifyContentCenter, alignItemsCenter])}>
            <span className={resourcesTitle}>Resources</span>
            {props.resources.map((resource, index) => (
                <div key={index}>
                    <a href={resource.link} className={linkContent}>{resource.resource}</a>
                </div>
            ))}
        </div>
    );
}