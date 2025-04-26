import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { alignItemsCenter, flexColumn } from "../../styling/shared.module.css";
import { classNameJoin } from "../../utilities/helpers/ClassnameJoiner";
import { failedMargin } from "./Failed.module.css";

export default function Failed() {
    return (
        <div className={classNameJoin([flexColumn, alignItemsCenter, failedMargin])}>
            <ErrorComponent errorText={"Something went wrong with your request. Please try refresing or try again later."}/>
        </div>
    )
}