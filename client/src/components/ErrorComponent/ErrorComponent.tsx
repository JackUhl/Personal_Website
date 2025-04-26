import { flexGap, flexRow, flexWrap } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import WindowComponent from "../WindowComponent/WindowComponent";
import { errorDialog, errorIcon } from "./ErrorComponent.module.css";
import error from "../../assets/svg/error.svg"
import { IErrorComponent } from "./IErrorComponent";


export default function ErrorComponent(props: IErrorComponent) {
    return (
        <WindowComponent title={"Error"}>
            <div className={errorDialog}>
                <div className={classNameJoin([flexRow, flexGap, flexWrap])}>
                    <img src={error} className={errorIcon}/>
                    <p>{props.errorText}</p>
                </div>
            </div>
        </WindowComponent>
    )
}