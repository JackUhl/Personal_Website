import { Link, useLocation } from "react-router-dom";
import { NavItems } from "../../models/constants/NavBarConstants";
import { alignItemsCenter, columnGap, flexColumn, flexRow, justifyContentAround, justifyContentBetween } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import { collapseState, expandedState, hamburgerMenuStyle, headerBar, headerTitle, mobileItemsBox, mobileMenu, name, navigationItem, navigationItemSelectable, navigationItemSelected } from "./HeaderComponent.module.css";
import { HomeRoute } from "../../models/constants/RouteConstants";
import { useEffect, useMemo, useState } from "react";
import burgerMenu from "../../assets/svg/burgerMenu.svg"
import { useIsMobile } from "../../hooks/useIsMobile";

export default function HeaderComponent() {
    const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false)

    const location = useLocation();
    const isMobile = useIsMobile();

    const hamburgerMenu = () => {
        return (
            <img src={burgerMenu} onClick={handleHamburgerIconClick} className={hamburgerMenuStyle}/>
        );
    };

    const shouldAddSelectedClass = (itemPathName: string) => {
        let sitePathName = location.pathname;

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

    const navItems = () => {
        return (
            <div className={isMobile ? mobileStyle : nonMobileStyle}>
                {NavItems.map((navItem, index) => (
                    <div key={index}>
                        <Link to={navItem.route} onClick={handleNavBarItemClicked} className={classNameJoin([navigationItem, navigationItemSelectable, shouldAddSelectedClass(navItem.route)])}>{navItem.title}</Link>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className={classNameJoin([flexRow, alignItemsCenter, justifyContentBetween, headerBar])}>
            <Link to={HomeRoute} className={navigationItem}>
                <div className={headerTitle}>
                    <p className={name}>Jackson Uhl</p>
                    <p>Software Developer</p>
                </div>
            </Link>
            {isMobile ? hamburgerMenu() : navItems()}
            <div className={classNameJoin([mobileMenu, mobileMenuExpanded ? expandedState : collapseState])}>
                { navItems() }
            </div>
        </div>
    )
}