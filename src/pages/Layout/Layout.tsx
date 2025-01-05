import { Outlet } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { layoutStyling } from "./Layout.module.css";

export default function Layout() {
    return (
        <div className={layoutStyling}>
            <HeaderComponent />
            <Outlet />
        </div>
    )
}