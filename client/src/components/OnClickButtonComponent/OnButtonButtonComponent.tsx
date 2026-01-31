import IOnClickButtonComponent from "./IOnButtonButtonComponent"
import { buttonComponent } from "./OnClickButtonComponent.module.css"

export default function OnClickButtonComponent(props: IOnClickButtonComponent) {
    return (
        <div className={buttonComponent} onClick={props.onClick}>
            {props.isSubmitting ? "Loading" : props.children}
        </div>
    )
}