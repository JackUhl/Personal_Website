import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";
import minimizeImage from "../../assets/svg/dash.svg"
import fullscreenImage from "../../assets/svg/square.svg"
import closeImage from "../../assets/svg/close.svg"
import { blinkEmpty, blinkFilled, closeButton, normalButton, opacityHidden, opacityShown, terminalBody, terminalWindow, windowTitle } from "./TerminalComponent.module.css";
import { flexRow, justifyContentBetween } from "../../styling/shared.module.css";
import { ITerminalComponent } from "./ITerminalComponent";
import { useEffect, useState } from "react";

export default function TerminalComponent(props: ITerminalComponent) {
    const [blink, setBlink] = useState(false);
    const [singleLetterIndex, setSingleLetterIndex] = useState(0);
    const [singleLetterArray, setSingleLetterArray] = useState<string[]>([])

    useEffect(() => {
        const array: string[] = [];

        for(let index = 0; index < props.text.length; index++) {
            array.push(props.text.charAt(index));
        }

        setSingleLetterArray(array);
    }, [])

    useEffect(() => {
        if(singleLetterIndex + 1 <= props.text.length)
        {
            setTimeout(() => {
                setSingleLetterIndex(singleLetterIndex + 1);
            }, 1);
        }
    }, [singleLetterIndex])

    useEffect(() => {
        setTimeout(() => {
            setBlink(!blink)
        }, 1000)
    }, [blink])

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
                <p>
                    {
                        <span>{`${props.drive ?? "C"}:\\${props.path ?? ""}> `}</span>
                    }  
                    {
                        singleLetterArray.map((item, index) => 
                            <span key={index} className={index < singleLetterIndex ? opacityShown : opacityHidden}>{item}</span>
                        )
                    }
                    {
                        <span className={ClassnameJoiner.join([blink ? blinkFilled : blinkEmpty, singleLetterIndex != props.text.length ? opacityHidden : opacityShown])}>&nbsp;</span>
                    }
                </p>
            </div>
        </div>
    )
}