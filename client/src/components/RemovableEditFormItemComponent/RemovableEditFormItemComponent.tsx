import closeSvg from "../../assets/svg/close.svg"
import { flexRow, icon, justifyContentEnd, spacing } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner/ClassnameJoiner";
import OnClickButtonComponent from "../OnClickButtonComponent/OnClickButtonComponent";
import IRemovableEditFormItemComponent from "./IRemovableEditFormItemComponent";
import { removableEditFormItem } from "./RemovableEditFormItemComponent.module.css";

export default function RemovableEditFormItemComponent(props: IRemovableEditFormItemComponent) {
    return (
        <div
            className={classNameJoin([removableEditFormItem, spacing])}
        >
            <div className={classNameJoin([flexRow, justifyContentEnd, spacing])}>
                <OnClickButtonComponent
                    onClick={props.onClick}
                >
                    <div className={classNameJoin([flexRow])} data-testid="remove-item-button">
                        <img src={closeSvg} className={icon} />
                    </div>
                </OnClickButtonComponent>
            </div>
            {props.children}
        </div>
    )
}