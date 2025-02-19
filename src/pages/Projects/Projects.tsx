import { flexRow, justifyContentCenter } from "../../styling/shared.module.css";
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";
import { underline } from "./Projects.module.css";

export default function Projects() {
    return (
        <div className={ClassnameJoiner.join([flexRow, justifyContentCenter])}>
            <p className={underline}>Under Construction</p>
        </div>
    )
}