import { flexColumn, fullWidth } from "../../../styling/shared.module.css";
import { classNameJoin } from "../../../utilities/helpers/ClassnameJoiner";
import { baseInputLabel } from "./BaseInputComponent.module.css";
import IBaseInputComponent from "./IBaseInputComponent";

export default function BaseInputComponent (props: IBaseInputComponent) {
    return (
        <div className={classNameJoin([flexColumn, fullWidth])}>
            {props.label && <p className={baseInputLabel}>{props.label}</p>}
            {props.inputElement}
        </div>
    )
}