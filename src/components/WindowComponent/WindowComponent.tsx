import { alignItemsCenter, alignItemsStart, flexColumn, flexRow, justifyContentBetween, justifyContentCenter } from "../../styling/shared.module.css";
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";
import IWindowComponent from "./IWindowComponent";
import { windowContainer, tenToolbarStyle, xpToolbarStyle, windowTitle, xpWindowStyle, xpButtonStyle, xpButtonsStyle, tenButtonNormalStyle, tenButtonCloseStyle, sevenWindowStyle, sevenToolbarStyle, sevenButtonNormalStyle, sevenButtonCloseStyle, sevenButtonMinimizeStyle, sevenWindowTitle, sevenContentStyle, sevenButtonsStyle, sevenButtonNormalImageStyle, sevenButtonCloseImageStyle, tenWindowStyle } from "./WindowComponent.module.css";
import minimizeImage from "../../assets/svg/dash.svg"
import fullscreenImage from "../../assets/svg/square.svg"
import closeImage from "../../assets/svg/close.svg"
import { WindowStyle } from "../../models/enums/WindowStyles";

export default function WindowComponent(props: IWindowComponent) { 
    const xpStyle = (
        <div className={windowContainer}>
            <div className={ClassnameJoiner.join([xpWindowStyle, flexColumn])}>
                <div className={ClassnameJoiner.join([xpToolbarStyle, flexRow, justifyContentBetween])}>
                    <p className={windowTitle}>{props.title}</p>
                    <div className={ClassnameJoiner.join([flexRow, alignItemsCenter, xpButtonsStyle])}>
                        <img src={minimizeImage} className={xpButtonStyle}/>
                        <img src={fullscreenImage} className={xpButtonStyle}/>
                        <img src={closeImage} className={xpButtonStyle}/>
                    </div>
                </div>
                {props.children}
            </div>
        </div>
    )

    const sevenStyle = (
        <div className={windowContainer}>
            <div className={ClassnameJoiner.join([sevenWindowStyle, flexColumn])}>
                <div className={ClassnameJoiner.join([sevenToolbarStyle, flexRow, justifyContentBetween])}>
                    <p className={ClassnameJoiner.join([windowTitle, sevenWindowTitle])}>{props.title}</p>
                    <div className={ClassnameJoiner.join([flexRow, alignItemsStart, sevenButtonsStyle])}>
                        <div className={ClassnameJoiner.join([flexRow, justifyContentCenter, alignItemsCenter, sevenButtonNormalStyle, sevenButtonMinimizeStyle])}>
                            <img src={minimizeImage} className={sevenButtonNormalImageStyle}/>
                        </div>
                        <div className={ClassnameJoiner.join([flexRow, justifyContentCenter, alignItemsCenter, sevenButtonNormalStyle])}>
                            <img src={fullscreenImage} className={sevenButtonNormalImageStyle}/>
                        </div>
                        <div className={ClassnameJoiner.join([flexRow, justifyContentCenter, alignItemsCenter, sevenButtonCloseStyle])}>
                            <img src={closeImage} className={sevenButtonCloseImageStyle}/>
                        </div>
                    </div>
                </div>
                <div className={sevenContentStyle}>
                    {props.children}
                </div>
            </div>
        </div>
    )

    const tenStyle = (
        <div className={windowContainer}>
            <div className={ClassnameJoiner.join([tenWindowStyle, flexColumn])}>
                <div className={ClassnameJoiner.join([tenToolbarStyle, flexRow, justifyContentBetween])}>
                    <p className={windowTitle}>{props.title}</p>
                    <div className={ClassnameJoiner.join([flexRow, alignItemsCenter])}>
                        <img src={minimizeImage} className={tenButtonNormalStyle}/>
                        <img src={fullscreenImage} className={tenButtonNormalStyle}/>
                        <img src={closeImage} className={tenButtonCloseStyle}/>
                    </div>
                </div>
                {props.children}
            </div>
        </div>
    )

    const getStyle = () => {
        if(props.theme == WindowStyle.Xp) {
            return xpStyle;
        }
        else if(props.theme == WindowStyle.Seven) {
            return sevenStyle;
        }
        else {
            return tenStyle
        }
    }
    
    return (
        <div>
            {getStyle()}
        </div>
    )
}