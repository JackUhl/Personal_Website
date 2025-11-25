import { buttonComponent } from "./ButtonComponent.module.css";
import IButtonComponent from "./IButtonComponent";

export default function ButtonComponent(props: IButtonComponent) {

    const hrefButton = () => {
        return (
            <a href={props.href} target={props.openInNewTab ? "_blank" : "" }>
                <div className={buttonComponent}>
                    {props.buttonElement}
                </div>
            </a>
        )
    }

    const onClickButton = () => {
        return (
            <div className={buttonComponent} onClick={props.onClick}>
                    {props.buttonElement}
            </div>
        )
    }

    return (
        <>
            {props.href ? hrefButton() : onClickButton()}
        </>
    )
}