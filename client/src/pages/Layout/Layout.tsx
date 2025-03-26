import { Outlet } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { layoutContainer, outletContainer } from "./Layout.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import { flexColumn, rowGap } from "../../styling/shared.module.css";

export default function Layout() {
    return (
        <div className={classNameJoin([layoutContainer, flexColumn, rowGap])}>
            <HeaderComponent />
            <div className={outletContainer}>
                <Outlet />
            </div>
        </div>
    )
}