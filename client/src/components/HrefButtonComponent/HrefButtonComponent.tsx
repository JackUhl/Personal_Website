import { hrefButtonComponent } from "./HrefButtonComponent.module.css";
import IHrefButtonComponent from "./IHrefButtonComponent";

export default function HrefButtonComponent(props: IHrefButtonComponent) {
    return (
        <a href={props.href} target={props.openInNewTab ? "_blank" : "" }>
            <div className={hrefButtonComponent}>
                {props.children}
            </div>
        </a>
    )
}