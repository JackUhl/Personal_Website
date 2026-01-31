import { alignItemsCenter, columnGap, flexRow, flexWrap, justifyContentBetween, rowGap } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import { contactIcon, contactContainer, mobileHomeContainer, desktopHomeContainer, title } from "./Home.module.css"
import { useState } from "react";
import TerminalComponent from "../../components/TerminalComponent/TerminalComponent";
import linkedin from "../../assets/svg/linkedin.svg"
import github from "../../assets/svg/github.svg"
import { emailAddress, githubUrl, linkedInUrl } from "../../models/constants/ExternalUrlConstants";
import HrefButtonComponent from "../../components/HrefButtonComponent/HrefButtonComponent";
import { WindowStyle } from "../../models/enums/WindowStyles";
import { useIsMobile } from "../../hooks/useIsMobile";
import RevealComponent from "../../components/RevealComponent/RevealComponent";

export default function Home() {
    const [randomWindowStyle] = useState<WindowStyle>(Math.floor(Math.random() * Object.keys(WindowStyle).length));
    const isMobile = useIsMobile();

    return (
        <div className={isMobile ? mobileHomeContainer : desktopHomeContainer}>
            <RevealComponent>
                <h1 className={title}>Hello,<br />I Write Computer Code</h1>
                <TerminalComponent
                    text={"Hi, my name is Jackson Uhl, welcome to my personal website! As an exceptionally driven and motivated junior software developer, I bring a strong work ethic to the team. Despite only having a couple years of enterprise level development experience, I have successfully demonstrated my ability to deliver high-quality, scalable solutions across both front-end and back-end development as a full-stack developer. Taking advantage of exciting new technologies and best practices, I strive to deliver an application that meets business requirements and is simultaneously engaging to the end users."}
                    theme={randomWindowStyle}
                />
                <div className={classNameJoin([contactContainer, flexRow, justifyContentBetween, alignItemsCenter, flexWrap, rowGap])}>
                    <div className={classNameJoin([flexRow, alignItemsCenter, columnGap])}>
                        <HrefButtonComponent
                            href={`mailto:${emailAddress}`}
                            openInNewTab={false}
                        >
                            <p>Contact Me</p>
                        </HrefButtonComponent>
                    </div>
                    <div className={classNameJoin([flexRow, alignItemsCenter, columnGap])}>
                        <a href={linkedInUrl} target="_blank"><img src={linkedin} className={contactIcon} /></a>
                        <a href={githubUrl} target="_blank"><img src={github} className={contactIcon} /></a>
                    </div>
                </div>
            </RevealComponent>
        </div>
    )
}