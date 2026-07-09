import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import arrowIcon from "../../assets/svg/arrow.svg";
import { useScrollOffset } from "../../hooks/useScrollOffset/useScrollOffset";
import { PageView } from "../../models/constants/AnalyticsConstants";
import { PushEvent } from "../../services/AnalyticsService/AnalyticsService";
import { alignItemsCenter, flexColumn, flexRow, justifyContentCenter, rowGap } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner/ClassnameJoiner";
import HeaderComponent from "./HeaderComponent/HeaderComponent";
import { layoutContainer, outletContainer, scrollTopButton, scrollTopButtonHide, scrollTopIcon } from "./Layout.module.css";

export default function Layout() {
    const location = useLocation();
    const scrollOffset = useScrollOffset();
    
    useEffect(() => {
        PushEvent(PageView);
    }, [location]);
    
    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const atTop = scrollOffset == 0;

    return (
        <div className={classNameJoin([layoutContainer, flexColumn, rowGap])}>
            <HeaderComponent />
            <div className={outletContainer}>
                <Outlet />
                <div className={classNameJoin([atTop ? scrollTopButtonHide : '', scrollTopButton, flexRow, justifyContentCenter, alignItemsCenter])} onClick={handleScrollTop} data-testid="layout-scroll-top-button">
                    <img src={arrowIcon} className={scrollTopIcon} data-testid="layout-scroll-top-icon"/>
                </div>
            </div>
        </div>
    )
}