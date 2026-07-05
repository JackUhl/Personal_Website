import { useState } from "react";

import github from "../../assets/svg/github.svg"
import linkedin from "../../assets/svg/linkedin.svg"
import HrefButtonComponent from "../../components/HrefButtonComponent/HrefButtonComponent";
import RevealComponent from "../../components/RevealComponent/RevealComponent";
import TerminalComponent from "../../components/TerminalComponent/TerminalComponent";
import { useIsMobile } from "../../hooks/useIsMobile/useIsMobile";
import { emailAddress, githubUrl, linkedInUrl } from "../../models/constants/ExternalUrlConstants";
import { WindowStyle } from "../../models/enums/WindowStyles";
import { alignItemsCenter, columnGap, flexRow, flexWrap, justifyContentBetween, rowGap } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner/ClassnameJoiner";
import { contactContainer, contactIcon, desktopHomeContainer, mobileHomeContainer, title } from "./Home.module.css"

export default function Home() {
    const [randomWindowStyle] = useState<WindowStyle>(Math.floor(Math.random() * Object.keys(WindowStyle).length));
    const isMobile = useIsMobile();

    return (
        <div className={isMobile ? mobileHomeContainer : desktopHomeContainer}>
            <RevealComponent>
                <h1 className={title} data-testid="home-title">Hello,<br />I Write Computer Code</h1>
                <TerminalComponent
                    text={"Hi, my name is Jackson Uhl, welcome to my personal website! As an exceptionally driven and motivated junior software developer, I bring a strong work ethic to the team. Despite only having a couple years of enterprise level development experience, I have successfully demonstrated my ability to deliver high-quality, scalable solutions across both front-end and back-end development as a full-stack developer. Taking advantage of exciting new technologies and best practices, I strive to deliver an application that meets business requirements and is simultaneously engaging to the end users."}
                    theme={randomWindowStyle}
                    data-testid="home-terminal"
                />
                <div className={classNameJoin([contactContainer, flexRow, justifyContentBetween, alignItemsCenter, flexWrap, rowGap])}>
                    <div className={classNameJoin([flexRow, alignItemsCenter, columnGap])}>
                        <HrefButtonComponent
                            href={`mailto:${emailAddress}`}
                            openInNewTab={false}
                            data-testid="home-mail-button"
                        >
                            <p>Contact Me</p>
                        </HrefButtonComponent>
                    </div>
                    <div className={classNameJoin([flexRow, alignItemsCenter, columnGap])}>
                        <a href={linkedInUrl} target="_blank" data-testid="home-linkedin-button"><img src={linkedin} className={contactIcon} /></a>
                        <a href={githubUrl} target="_blank" data-testid="home-github-button"><img src={github} className={contactIcon} /></a>
                    </div>
                </div>
            </RevealComponent>
        </div>
    )
}