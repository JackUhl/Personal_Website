import IOnClickButtonComponent from "./IOnButtonButtonComponent"
import { onClickButtonComponent } from "./OnClickButtonComponent.module.css"

export default function OnClickButtonComponent(props: IOnClickButtonComponent) {
    return (
        <div className={onClickButtonComponent} onClick={props.onClick}>
            {props.isSubmitting ? "Loading" : props.children}
        </div>
    )
}