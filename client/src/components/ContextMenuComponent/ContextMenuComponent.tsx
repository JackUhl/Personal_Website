import { useEffect, useRef, useState } from "react";

import ellipsisSvg from "../../assets/svg/ellipsis.svg"
import { flexRow, icon } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner/ClassnameJoiner";
import OnClickButtonComponent from "../OnClickButtonComponent/OnClickButtonComponent";
import { contextMenuContainer, contextMenuItems, ellipsis } from "./ContextMenuComponent.module.css";

export default function ContextMenuComponent(props: React.PropsWithChildren) {
    const [visible, setVisible] = useState(false);
    const contextMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
                setVisible(false);
            }
        };

        if (visible) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [visible]);

    const handleOnClick = () => {
        setVisible((visible) => !visible);
    }

    return (
        <div
            ref={contextMenuRef}
            className={contextMenuContainer}
        >
            <OnClickButtonComponent
                onClick={handleOnClick}
            >
                <div className={flexRow} data-testid="more-options">
                    <img src={ellipsisSvg} className={classNameJoin([icon, ellipsis])} />
                </div>
            </OnClickButtonComponent>
            {
                visible && (
                    <div
                        className={contextMenuItems}
                        onClick={() => setVisible(false)}
                    >
                        {props.children}
                    </div>
                )
            }
        </div>
    );
}