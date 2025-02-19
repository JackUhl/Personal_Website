import { Outlet } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { layoutContainer, outletContainer } from "./Layout.module.css";
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";
import { flexColumn, rowGap } from "../../styling/shared.module.css";

export default function Layout() {
    return (
        <div className={ClassnameJoiner.join([layoutContainer, flexColumn, rowGap])}>
            <HeaderComponent />
            <div className={outletContainer}>
                <Outlet />
            </div>
        </div>
    )
}