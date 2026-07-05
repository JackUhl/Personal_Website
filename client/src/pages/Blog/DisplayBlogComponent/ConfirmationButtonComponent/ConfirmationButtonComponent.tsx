import { useState } from "react";

import checkmarkSvg from "../../../../assets/svg/checkmark.svg"
import closeSvg from "../../../../assets/svg/close.svg"
import OnClickButtonComponent from "../../../../components/OnClickButtonComponent/OnButtonButtonComponent";
import { flexRow, icon } from "../../../../styling/shared.module.css";
import { classNameJoin } from "../../../../utilities/helpers/ClassnameJoiner/ClassnameJoiner";
import { confirmationButtonGap } from "./ConfirmationButtonComponent.module.css";
import { IConfirmationButtonComponent } from "./IConfirmationButtonComponent";

export default function ConfirmationButtonComponent(props: IConfirmationButtonComponent) {
    const [confirmation, setConfirmation] = useState(false)
    
    return (
        confirmation ? (
            <div className={classNameJoin([flexRow, confirmationButtonGap])}>
                <OnClickButtonComponent
                    onClick={props.onClick}
                >
                    <div className={classNameJoin([flexRow])} data-testid="confirm-button">
                        <img src={checkmarkSvg} className={icon} />
                    </div>
                </OnClickButtonComponent>
                <OnClickButtonComponent
                    onClick={() => setConfirmation(false)}
                >
                    <div className={classNameJoin([flexRow])} data-testid="cancel-button">
                        <img src={closeSvg} className={icon} />
                    </div>
                </OnClickButtonComponent>
            </div>
        ) : (
            <OnClickButtonComponent
                onClick={() => setConfirmation(true)}
            >
                <div data-testid="initial-button">
                    {props.children}
                </div>
            </OnClickButtonComponent>
        )
    );
}