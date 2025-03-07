import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";
import minimizeImage from "../../assets/svg/dash.svg"
import fullscreenImage from "../../assets/svg/square.svg"
import closeImage from "../../assets/svg/close.svg"
import { blinkEmpty, blinkFilled, closeButton, normalButton, opacityHidden, opacityShown, terminalBody, terminalContainer, terminalWindow, windowTitle } from "./TerminalComponent.module.css";
import { flexRow, justifyContentBetween } from "../../styling/shared.module.css";
import { ITerminalComponent } from "./ITerminalComponent";
import { useEffect, useState } from "react";
import RevealComponent from "../RevealComponent/RevealComponent";

export default function TerminalComponent(props: ITerminalComponent) {
    const [blink, setBlink] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setBlink(!blink)
        }, 1000)
    }, [blink]);

    const singleLetterSpans = []
    for(let index = 0; index < props.text.length; index++) {
        singleLetterSpans.push(
            <span key={index}>{props.text.charAt(index)}</span>
        )
    }

    return(
        <div className={terminalContainer}>
            <div className={ClassnameJoiner.join([terminalWindow, flexRow, justifyContentBetween])}>
                <p className={windowTitle}>Command Prompt</p>
                <div>
                    <img src={minimizeImage} className={normalButton}/>
                    <img src={fullscreenImage} className={normalButton}/>
                    <img src={closeImage} className={closeButton}/>
                </div>
            </div>
            <div className={terminalBody}>
                <div>
                    <span>{`${props.drive ?? "C"}:\\${props.path ?? ""}> `}</span> 
                    <RevealComponent timeoutInterval={1} displayInline={true} noAnimation={true}>
                        {singleLetterSpans}
                        <span className={ClassnameJoiner.join([blink ? blinkFilled : blinkEmpty])}>&nbsp;</span>
                    </RevealComponent>
                </div>
            </div>
        </div>
    )
}