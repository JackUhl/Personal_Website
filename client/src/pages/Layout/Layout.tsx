import { Outlet } from "react-router-dom";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { layoutContainer, outletContainer, scrollTopButton, scrollTopButtonHide, scrollTopIcon } from "./Layout.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import { alignItemsCenter, flexColumn, flexRow, justifyContentCenter, rowGap } from "../../styling/shared.module.css";
import arrowIcon from "../../assets/svg/expand.svg";
import { useScrollOffset } from "../../hooks/useScrollOffset";

export default function Layout() {
    const scrollOffset = useScrollOffset();
    
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
                <div className={classNameJoin([atTop ? scrollTopButtonHide : '', scrollTopButton, flexRow, justifyContentCenter, alignItemsCenter])} onClick={handleScrollTop}>
                    <img src={arrowIcon} className={scrollTopIcon}/>
                </div>
            </div>
        </div>
    )
}