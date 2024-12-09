import { Link, useLocation } from "react-router-dom";
import { NavItems } from "../../models/constants/NavBarConstants";
import { alignItemsCenter, columnGap, flexRow, justifyContentBetween } from "../../styling/shared.module.css";
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";
import { headerMargin, name, navigationItem, navigationItemSelectable, navigationItemSelected } from "./HeaderComponent.module.css";
import { HomeRoute } from "../../models/constants/InternalUrlConstants";

export default function HeaderComponent() {
    const location = useLocation()

    const shouldAddSelectedClass = (itemPathName: string): string => {
        let sitePathName = location.pathname;

        return sitePathName.includes(itemPathName) ? navigationItemSelected : "";
    }
    
    const handleNavBarItemClicked = () => {
        window.scrollTo(0, 0);
    }

    return (
        <>
            <div className={ClassnameJoiner.join([flexRow, alignItemsCenter, justifyContentBetween, headerMargin])}>
                <Link to={HomeRoute} className={navigationItem}>
                    <div>
                        <p className={name}>Jackson Uhl</p>
                        <p>Software Developer</p>
                    </div>
                </Link>
                <div className={ClassnameJoiner.join([flexRow, alignItemsCenter, columnGap])}>
                    {NavItems.map((navItem, index) => {
                        return (
                            <div key={index}>
                                <Link to={navItem.route} onClick={handleNavBarItemClicked} className={ClassnameJoiner.join([navigationItem, navigationItemSelectable, shouldAddSelectedClass(navItem.route)])}>{navItem.title}</Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}