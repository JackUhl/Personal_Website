import { alignItemsCenter, columnGap, flexGap, flexRow, flexWrapReverse, justifyContentCenter } from "../../styling/shared.module.css";
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";
import {homeStyling, introTextWidthMobile, introTextWidthDesktop, contactIcon, contactContainer} from "./Home.module.css"
import { useContext } from "react";
import { IsMobileContext } from "../../contexts/IsMobileContext";
import TerminalComponent from "../../components/TerminalComponent/TerminalComponent";
import linkedin from "../../assets/svg/linkedin.svg"
import github from "../../assets/svg/github.svg"
import email from "../../assets/svg/email.svg"
import { emailAddress, githubUrl, linkedInUrl } from "../../models/constants/ExternalUrlConstants";

export default function Home() {
    const isMobile = useContext(IsMobileContext);

    return (
        <div className={homeStyling}>
            <div className={ClassnameJoiner.join([flexRow, justifyContentCenter, alignItemsCenter, flexGap, flexWrapReverse])}>
                <div className={isMobile ? introTextWidthMobile : introTextWidthDesktop}>
                    <h1>Hello,<br/>I Write Code</h1>
                    <TerminalComponent 
                        text={"Hi, my name is Jackson Uhl and I write code for a living. As an exceptionally driven and motivated junior software developer, I bring a strong work ethic to the team. Despite only having a couple years of enterprise level development experience, I have successfully demonstrated my ability to deliver high-quality, scalable solutions across both front-end and back-end development as a full-stack developer. Taking advantage of exciting new technologies and best practices, I strive to deliver an application that meets business requirements and is simultaneously engaging to the end users."}
                    />
                    <div className={ClassnameJoiner.join([contactContainer, flexRow, alignItemsCenter, columnGap])}>
                        <a href={linkedInUrl} target="_blank"><img src={linkedin} className={contactIcon}/></a>
                        <a href={githubUrl} target="_blank"><img src={github} className={contactIcon}/></a>
                        <a href={`mailto:${emailAddress}`}><img src={email} className={contactIcon}/></a>
                    </div>
                </div>
            </div>
        </div>
    )
}