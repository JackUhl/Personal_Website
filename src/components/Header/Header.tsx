import { alignItemsCenter, columnGap, flexRow, justifyContentBetween} from "../../styling/shared.module.css";
import ClassnameJoiner from "../../utilities/ClassnameJoiner";
import { name, nameTitleBox, navigationBox } from "./Header.module.css";

export default function Header() {
    const navItems = ["Resume", "Projects", "Blog"];

    return (
        <>
            <div className={ClassnameJoiner.join([flexRow, justifyContentBetween])}>
                <div className={ClassnameJoiner.join([flexRow, alignItemsCenter, columnGap, nameTitleBox])}>
                    <p className={name}>Jackson Uhl</p>
                    <p>Software Developer</p>
                </div>
                <div className={ClassnameJoiner.join([flexRow, alignItemsCenter, columnGap, navigationBox])}>
                    {navItems.map((navItem, index) => {
                        return(
                            <p key={index}>{navItem}</p>
                        );
                    })}
                </div>
            </div>
        </>
    )
}