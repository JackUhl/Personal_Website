import { alignItemsCenter, flexGap, flexRow, flexWrapReverse, justifyContentCenter } from "../../styling/shared.module.css";
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";
import {homeStyling, headshot, headshotWidthMobile, headshotWidthDesktop, introTextWidthMobile, introTextWidthDesktop} from "./Home.module.css"
import headshotImage from "../../assets/images/Headshot.jpg";
import { useContext } from "react";
import { IsMobileContext } from "../../contexts/IsMobileContext";

export default function Home() {
    const isMobile = useContext(IsMobileContext);

    return (
        <div className={homeStyling}>
            <div className={ClassnameJoiner.join([flexRow, justifyContentCenter, alignItemsCenter, flexGap, flexWrapReverse])}>
                <img src={headshotImage} className={ClassnameJoiner.join([headshot, isMobile ? headshotWidthMobile : headshotWidthDesktop])}/>
                <div className={isMobile ? introTextWidthMobile : introTextWidthDesktop}>
                    <h1>Hello,<br/>I Write Code</h1>
                    <p>Hi, my name is Jackson Uhl and I write code for a living. As an exceptionally driven and motivated junior software developer, I bring a strong work ethic to the team. Despite only having a couple years of enterprise level development experience, I have successfully demonstrated my ability to deliver high-quality, scalable solutions across both front-end and back-end development as a full-stack developer. Taking advantage of exciting new technologies and best practices, I strive to deliver an application that meets business requirements and is simultaneously engaging to the end users.</p>
                </div>
            </div>
        </div>
    )
}