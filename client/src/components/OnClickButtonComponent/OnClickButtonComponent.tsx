import { alignItemsEnd, flexColumn } from "../../styling/shared.module.css"
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner/ClassnameJoiner"
import LoaderComponent from "../LoaderComponent/LoaderComponent"
import IOnClickButtonComponent from "./IOnButtonButtonComponent"
import { disabled, hidden, loaderWrapper, onClickButtonComponent, visible } from "./OnClickButtonComponent.module.css"

export default function OnClickButtonComponent(props: IOnClickButtonComponent) {
    const shouldDisable = props.isSubmitting || props.isDisabled;

    return (
        <div className={classNameJoin([flexColumn, alignItemsEnd])}>
            <div className={classNameJoin([onClickButtonComponent, shouldDisable ? disabled : ""])} onClick={props.onClick}>
                <span className={props.isSubmitting ? hidden : visible}>{props.children}</span>
                {props.isSubmitting && <div className={loaderWrapper}><LoaderComponent /></div>}
            </div>
        </div>
    )
}