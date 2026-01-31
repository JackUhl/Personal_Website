import { useState } from "react";
import { IConfirmationButtonComponent } from "./IConfirmationButtonComponent";
import OnClickButtonComponent from "../../../../components/OnClickButtonComponent/OnButtonButtonComponent";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner";
import { flexRow, icon } from "../../../../styling/shared.module.css";
import checkmarkSvg from "../../../../assets/svg/checkmark.svg"
import closeSvg from "../../../../assets/svg/close.svg"
import { confirmationButtonGap } from "./ConfirmationButtonComponent.module.css";

export default function ConfirmationButtonComponent(props: IConfirmationButtonComponent) {
    const [confirmation, setConfirmation] = useState(false)
    
    return (
        confirmation ? (
            <div className={classNameJoin([flexRow, confirmationButtonGap])}>
                <OnClickButtonComponent
                    onClick={props.onClick}
                >
                    <div className={classNameJoin([flexRow])}>
                        <img src={checkmarkSvg} className={icon} />
                    </div>
                </OnClickButtonComponent>
                <OnClickButtonComponent
                    onClick={() => setConfirmation(false)}
                >
                    <div className={classNameJoin([flexRow])}>
                        <img src={closeSvg} className={icon} />
                    </div>
                </OnClickButtonComponent>
            </div>
        ) : (
            <OnClickButtonComponent
                onClick={() => setConfirmation(true)}
            >
                {props.children}
            </OnClickButtonComponent>
        )
    );
}