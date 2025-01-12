import { Outlet } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { layoutStyling, outletStyling } from "./Layout.module.css";

export default function Layout() {
    return (
        <div className={layoutStyling}>
            <HeaderComponent />
            <div className={outletStyling}>
                <Outlet />
            </div>
        </div>
    )
}