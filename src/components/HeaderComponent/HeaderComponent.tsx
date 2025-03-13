import { Link, useLocation } from "react-router-dom";
import { NavItems } from "../../models/constants/NavBarConstants";
import { alignItemsCenter, columnGap, flexColumn, flexRow, justifyContentAround, justifyContentBetween } from "../../styling/shared.module.css";
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";
import { collapseState, expandedState, hamburgerMenuStyle, headerBar, headerTitle, mobileItemsBox, mobileMenu, name, navigationItem, navigationItemSelectable, navigationItemSelected } from "./HeaderComponent.module.css";
import { HomeRoute } from "../../models/constants/InternalUrlConstants";
import { useContext, useEffect, useMemo, useState } from "react";
import { IsMobileContext } from "../../contexts/IsMobileContext";
import burgerMenu from "../../assets/svg/burgerMenu.svg"
import RevealComponent from "../RevealComponent/RevealComponent";

export default function HeaderComponent() {
    const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false)

    const location = useLocation();
    const isMobile = useContext(IsMobileContext);

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
        return ClassnameJoiner.join([flexRow, alignItemsCenter, columnGap]);
    }, []);

    const mobileStyle = useMemo(() => {
        return ClassnameJoiner.join([flexColumn, alignItemsCenter, justifyContentAround, mobileItemsBox]);
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
                {NavItems.map((navItem, index) => {
                    return (
                        <div key={index}>
                            <Link to={navItem.route} onClick={handleNavBarItemClicked} className={ClassnameJoiner.join([navigationItem, navigationItemSelectable, shouldAddSelectedClass(navItem.route)])}>{navItem.title}</Link>
                        </div>
                    );
                })}
            </div>
        )
    }

    return (
        <div className={ClassnameJoiner.join([flexRow, alignItemsCenter, justifyContentBetween, headerBar])}>
            <Link to={HomeRoute} className={navigationItem}>
                <div className={headerTitle}>
                    <p className={name}>Jackson Uhl</p>
                    <p>Software Developer</p>
                </div>
            </Link>
            {isMobile ? hamburgerMenu() : navItems()}
            <div className={ClassnameJoiner.join([mobileMenu, mobileMenuExpanded ? expandedState : collapseState])}>
                { navItems() }
            </div>
        </div>
    )
}