import { Link, useLocation } from "react-router-dom";
import { adminModeIndicator, collapseState, expandedState, hamburgerMenuStyle, headerBar, headerTitle, mobileItemsBox, mobileMenu, name, navigationItem, navigationItemSelectable, navigationItemSelected } from "./HeaderComponent.module.css";
import { useContext, useEffect, useMemo, useState } from "react";
import burgerMenu from "../../../assets/svg/burgerMenu.svg"
import { useIsMobile } from "../../../hooks/useIsMobile";
import { HomeRoute } from "../../../models/constants/RouteConstants";
import { NavItems } from "../../../models/constants/NavBarConstants";
import { classNameJoin } from "../../../utilities/helpers/ClassnameJoiner";
import { alignItemsCenter, columnGap, flexColumn, flexRow, justifyContentAround, justifyContentBetween } from "../../../styling/shared.module.css";
import { AuthenticationContext } from "../../../contexts/AuthenticationContext";

export default function HeaderComponent() {
    const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false)

    const location = useLocation();
    const isMobile = useIsMobile();
    const isAdmin = useContext(AuthenticationContext);

    const shouldAddSelectedClass = (itemPathName: string) => {
        const sitePathName = location.pathname;

        return sitePathName == itemPathName ? navigationItemSelected : "";
    };
    
    const handleNavBarItemClicked = () => {
        window.scrollTo(0, 0);
        setMobileMenuExpanded(false);
    };

    const handleHamburgerIconClick = () => {
        setMobileMenuExpanded(!mobileMenuExpanded)
    };

    const nonMobileStyle = useMemo(() => {
        return classNameJoin([flexRow, alignItemsCenter, columnGap]);
    }, []);

    const mobileStyle = useMemo(() => {
        return classNameJoin([flexColumn, alignItemsCenter, justifyContentAround, mobileItemsBox]);
    }, []);

    const navItems = useMemo(() => {
        return (
            <div className={isMobile ? mobileStyle : nonMobileStyle}>
                {NavItems.map((navItem, index) => (
                    <div key={index}>
                        <Link to={navItem.route} onClick={handleNavBarItemClicked} className={classNameJoin([navigationItem, navigationItemSelectable, shouldAddSelectedClass(navItem.route)])}>{navItem.title}</Link>
                    </div>
                ))}
            </div>
        )
    }, [isMobile, NavItems, nonMobileStyle, mobileStyle, location, mobileMenuExpanded])

    const hamburgerMenu = useMemo(() => {
        return (
            <img src={burgerMenu} onClick={handleHamburgerIconClick} className={hamburgerMenuStyle}/>
        );
    }, [mobileMenuExpanded]);

    useEffect(() => {
        setMobileMenuExpanded(false);
    }, [isMobile]);

    useEffect(() => {
        if (mobileMenuExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [mobileMenuExpanded]);

    return (
        <div className={classNameJoin([flexRow, alignItemsCenter, justifyContentBetween, headerBar])}>
            <Link to={HomeRoute} className={navigationItem}>
                <div className={headerTitle}>
                    <p className={name}>Jackson Uhl</p>
                    <p>Software Developer</p>
                    {isAdmin && <p>Admin Mode: <span className={adminModeIndicator}>Enabled</span></p>}
                </div>
            </Link>
            {isMobile ? hamburgerMenu : navItems}
            <div className={classNameJoin([mobileMenu, mobileMenuExpanded ? expandedState : collapseState])}>
                { navItems }
            </div>
        </div>
    )
}