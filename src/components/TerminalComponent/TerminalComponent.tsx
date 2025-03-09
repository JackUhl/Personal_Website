import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";
import { blinkEmpty, blinkFilled, terminalBody } from "./TerminalComponent.module.css";
import { ITerminalComponent } from "./ITerminalComponent";
import { useEffect, useState } from "react";
import RevealComponent from "../RevealComponent/RevealComponent";
import WindowComponent from "../WindowComponent/WindowComponent";

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
        <WindowComponent title={"Command Prompt"} theme={props.theme}>
            <div className={terminalBody}>
                <div>
                    <span>{`${props.drive ?? "C"}:\\${props.path ?? ""}> `}</span> 
                    <RevealComponent timeoutInterval={1} displayInline={true} noAnimation={true}>
                        {singleLetterSpans}
                        <span className={ClassnameJoiner.join([blink ? blinkFilled : blinkEmpty])}>&nbsp;</span>
                    </RevealComponent>
                </div>
            </div>
        </WindowComponent>
    )
}