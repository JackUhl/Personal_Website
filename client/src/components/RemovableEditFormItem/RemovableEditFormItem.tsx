import closeSvg from "../../assets/svg/close.svg"
import { flexRow, icon, justifyContentEnd, spacing } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner/ClassnameJoiner";
import OnClickButtonComponent from "../OnClickButtonComponent/OnButtonButtonComponent";
import IRemovableEditFormItem from "./IRemovableEditFormItem";
import { removableEditFormItem } from "./RemovableEditFormItem.module.css";

export default function RemovableEditFormItem(props: IRemovableEditFormItem) {
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