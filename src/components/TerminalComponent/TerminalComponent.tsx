import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";
import minimizeImage from "../../assets/svg/dash.svg"
import fullscreenImage from "../../assets/svg/square.svg"
import closeImage from "../../assets/svg/close.svg"
import { blinkEmpty, blinkFilled, closeButton, normalButton, terminalBody, terminalWindow, windowTitle } from "./TerminalComponent.module.css";
import { flexRow, justifyContentBetween } from "../../styling/shared.module.css";
import { ITerminalComponent } from "./ITerminalComponent";
import { useEffect, useState } from "react";

export default function TerminalComponent(props: ITerminalComponent) {
    const [blinkState, setBlinkState] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setBlinkState(!blinkState)
        }, 1000)
    }, [blinkState])

    return(
        <div>
            <div className={ClassnameJoiner.join([terminalWindow, flexRow, justifyContentBetween])}>
                <p className={windowTitle}>
                    Command Prompt
                </p>
                <div>
                    <img src={minimizeImage} className={normalButton}/>
                    <img src={fullscreenImage} className={normalButton}/>
                    <img src={closeImage} className={closeButton}/>
                </div>
            </div>
            <div className={terminalBody}>
                <p>{"C:\\>"}  {props.text} <span className={blinkState ? blinkFilled : blinkEmpty}>&nbsp;</span></p>
            </div>
        </div>
    )
}