import { Link, useLocation } from "react-router-dom";
import { NavItems } from "../../models/constants/NavBarConstants";
import { alignItemsCenter, alignItemsEnd, columnGap, flexColumn, flexRow, justifyContentBetween } from "../../styling/shared.module.css";
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";
import { collapseState, expandedState, hamburgerMenuStyle, headerMargin, mobileMenu, name, navigationItem, navigationItemSelectable, navigationItemSelected } from "./HeaderComponent.module.css";
import { HomeRoute } from "../../models/constants/InternalUrlConstants";
import { useContext, useEffect, useState } from "react";
import { IsMobileContext } from "../../contexts/IsMobileContext";
import burgerMenu from "../../assets/svg/burgerMenu.svg"

export default function HeaderComponent() {
    const [mobileMenuExpanded, setMobileMenuExpanded] = useState(false)

    const location = useLocation();
    const isMobile = useContext(IsMobileContext);

    const shouldAddSelectedClass = (itemPathName: string) => {
        let sitePathName = location.pathname;

        return sitePathName == itemPathName ? navigationItemSelected : "";
    }
    
    const handleNavBarItemClicked = () => {
        window.scrollTo(0, 0);
        setMobileMenuExpanded(false);
    }

    const handleHamburgerIconClick = () => {
        setMobileMenuExpanded(!mobileMenuExpanded)
    }

    const nonMobileNav = () => {
        return (
            <div className={ClassnameJoiner.join([flexRow, alignItemsCenter, columnGap])}>
                {NavItems.map((navItem, index) => {
                    return (
                        <div key={index}>
                            <Link to={navItem.route} onClick={handleNavBarItemClicked} className={ClassnameJoiner.join([navigationItem, navigationItemSelectable, shouldAddSelectedClass(navItem.route)])}>{navItem.title}</Link>
                        </div>
                    );
                })}
            </div>
        );
    }

    const hamburgerMenu = () => {
        return (
            <img src={burgerMenu} onClick={handleHamburgerIconClick} className={hamburgerMenuStyle}/>
        );
    }

    const mobileNav = () => {
        return (
            <div className={ClassnameJoiner.join([flexColumn, alignItemsEnd])}>
                {NavItems.map((navItem, index) => {
                    return (
                        <div key={index}>
                            <Link to={navItem.route} onClick={handleNavBarItemClicked} className={ClassnameJoiner.join([navigationItem, navigationItemSelectable, shouldAddSelectedClass(navItem.route)])}>{navItem.title}</Link>
                        </div>
                    );
                })}
            </div>
        );
    }

    useEffect(() => {
        setMobileMenuExpanded(false);
    }, [isMobile])

    return (
        <div className={headerMargin}>
            <div className={ClassnameJoiner.join([flexRow, alignItemsCenter, justifyContentBetween])}>
                <Link to={HomeRoute} className={navigationItem}>
                    <div>
                        <p className={name}>Jackson Uhl</p>
                        <p>Software Developer</p>
                    </div>
                </Link>
                {isMobile ? hamburgerMenu() : nonMobileNav()}
            </div>
            <div className={ClassnameJoiner.join([mobileMenu, mobileMenuExpanded ? expandedState : collapseState])}>
                { mobileNav()}
            </div>
        </div>
    )
}