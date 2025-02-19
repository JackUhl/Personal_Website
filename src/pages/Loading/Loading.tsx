import LoaderComponent from "../../components/LoaderComponent/LoaderComponent";
import { flexRow, justifyContentCenter } from "../../styling/shared.module.css";
import ClassnameJoiner from "../../utilities/helpers/ClassnameJoiner";

export function Loading() {
    return (
        <div className={ClassnameJoiner.join([flexRow, justifyContentCenter])}>
            <LoaderComponent/>
        </div>
    )
}