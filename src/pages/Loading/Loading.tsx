import LoaderComponent from "../../components/LoaderComponent/LoaderComponent";
import { flexRow, justifyContentCenter } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import { loadingMargin } from "./Loading.module.css";

export function Loading() {
    return (
        <div className={classNameJoin([flexRow, justifyContentCenter, loadingMargin])}>
            <LoaderComponent/>
        </div>
    )
}