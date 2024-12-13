import { Outlet } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { layoutStyling } from "./Layout.module.css";
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";
import { justifySelfCenter } from "../../styling/shared.module.css";

export default function Layout() {
    return (
        <div className={ClassnameJoiner.join([layoutStyling])}>
            <HeaderComponent />
            <Outlet />
        </div>
    )
}