import { useEffect, useState } from "react";

import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner/ClassnameJoiner";
import RevealComponent from "../RevealComponent/RevealComponent";
import WindowComponent from "../WindowComponent/WindowComponent";
import ITerminalComponent from "./ITerminalComponent";
import { blinkEmpty, blinkFilled, terminalBody } from "./TerminalComponent.module.css";

export default function TerminalComponent(props: ITerminalComponent) {
    const [blink, setBlink] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setBlink(prev => !prev);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const singleLetterSpans = props.text.split('').map((char, index) => (
        <span key={index}>{char}</span>
    ));

    return (
        <WindowComponent title={"Command Prompt"} theme={props.theme}>
            <div className={terminalBody}>
                <div>
                    <span>{`C:\\${props.path ?? ""}> `}</span>
                    <RevealComponent timeoutInterval={1} displayInline={true} noAnimation={true}>
                        {singleLetterSpans}
                        <span className={classNameJoin([blink ? blinkFilled : blinkEmpty])}>&nbsp;</span>
                    </RevealComponent>
                </div>
            </div>
        </WindowComponent>
    )
}