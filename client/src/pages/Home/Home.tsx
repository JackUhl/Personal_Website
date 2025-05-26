import { alignItemsCenter, columnGap, flexRow, flexWrap, justifyContentBetween, rowGap } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import { contactIcon, contactContainer, mobileHomeContainer, desktopHomeContainer} from "./Home.module.css"
import { useContext, useState } from "react";
import { IsMobileContext } from "../../contexts/IsMobileContext";
import TerminalComponent from "../../components/TerminalComponent/TerminalComponent";
import linkedin from "../../assets/svg/linkedin.svg"
import github from "../../assets/svg/github.svg"
import { emailAddress, githubUrl, linkedInUrl } from "../../models/constants/ExternalUrlConstants";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import resume from "../../assets/docs/Resume.pdf"
import { WindowStyle } from "../../models/enums/WindowStyles";

export default function Home() {
    const [randomWindowStyle] = useState<WindowStyle>(Math.floor(Math.random() * Object.keys(WindowStyle).length));
    const isMobile = useContext(IsMobileContext);

    return (
        <div className={isMobile ? mobileHomeContainer : desktopHomeContainer}>
            <h1>Hello,<br/>I Write Computer Code</h1>
            <TerminalComponent
                text={"Hi, my name is Jackson Uhl, welcome to my personal website! As an exceptionally driven and motivated junior software developer, I bring a strong work ethic to the team. Despite only having a couple years of enterprise level development experience, I have successfully demonstrated my ability to deliver high-quality, scalable solutions across both front-end and back-end development as a full-stack developer. Taking advantage of exciting new technologies and best practices, I strive to deliver an application that meets business requirements and is simultaneously engaging to the end users."}
                theme={randomWindowStyle}
            />
            <div className={classNameJoin([contactContainer, flexRow, justifyContentBetween, alignItemsCenter, flexWrap, rowGap])}>
                <div className={classNameJoin([flexRow, alignItemsCenter, columnGap])}>
                    <ButtonComponent 
                        buttonElement={<p>Resume</p>}
                        href={resume}
                        openInNewTab={true}
                    />
                    <ButtonComponent 
                        buttonElement={<p>Contact Me</p>}
                        href={`mailto:${emailAddress}`}
                        openInNewTab={false}
                    />
                </div>
                <div className={classNameJoin([flexRow, alignItemsCenter, columnGap])}>
                    <a href={linkedInUrl} target="_blank"><img src={linkedin} className={contactIcon}/></a>
                    <a href={githubUrl} target="_blank"><img src={github} className={contactIcon}/></a>
                </div>
            </div>
        </div>
    )
}