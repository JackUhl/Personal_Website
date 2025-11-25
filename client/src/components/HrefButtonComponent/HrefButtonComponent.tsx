import { buttonComponent } from "./HrefButtonComponent.module.css";
import IHrefButtonComponent from "./IHrefButtonComponent";

export default function HrefButtonComponent(props: IHrefButtonComponent) {
    return (
        <a href={props.href} target={props.openInNewTab ? "_blank" : "" }>
            <div className={buttonComponent}>
                {props.buttonElement}
            </div>
        </a>
    )
}