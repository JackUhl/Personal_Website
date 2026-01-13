import { flexRow, icon, justifyContentEnd, spacing } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import OnClickButtonComponent from "../OnClickButtonComponent/OnButtonButtonComponent";
import IRemovableEditFormItem from "./IRemovableEditFormItem";
import { removableEditFormItem } from "./RemovableEditFormItem.module.css";
import closeSvg from "../../assets/svg/close.svg"

export default function RemovableEditFormItem(props: IRemovableEditFormItem) {
    return (
        <div
            className={classNameJoin([removableEditFormItem, spacing])}
        >
            <div className={classNameJoin([flexRow, justifyContentEnd])}>
                <OnClickButtonComponent
                    onClick={props.onClick}
                >
                    <div className={classNameJoin([flexRow])}>
                        <img src={closeSvg} className={icon} />
                    </div>
                </OnClickButtonComponent>
            </div>
            {props.children}
        </div>
    )
}