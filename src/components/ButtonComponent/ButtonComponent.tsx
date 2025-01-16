import { buttonComponent } from "./ButtonComponent.module.css";
import { IButtonComponent } from "./IButtonComponent";

export default function ButtonComponent(props: IButtonComponent) {
    return (
        <a href={props.href} target={props.openInNewTab ? "_blank" : ""}>
            <div className={buttonComponent}>
                <p>{props.buttonText}</p>
            </div>
        </a>
    )
}