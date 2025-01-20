import { Outlet } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { layoutStyling, desktopOutletStyling } from "./Layout.module.css";
import { useContext } from "react";
import { IsMobileContext } from "../../contexts/IsMobileContext";

export default function Layout() {
    const isMobile = useContext(IsMobileContext);

    return (
        <div className={layoutStyling}>
            <HeaderComponent />
            <div className={isMobile ? "" : desktopOutletStyling}>
                <Outlet />
            </div>
        </div>
    )
}