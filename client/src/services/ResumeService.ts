import axios from "axios";
import { ResumeItems } from "../models/objects/ResumeItems";
import { AxiosTimeoutInMs } from "../models/constants/ConfigurationConstants";
import { ResumeApiRoute } from "../models/constants/RouteConstants";

const url = `${import.meta.env.VITE_BACKEND_URL}${ResumeApiRoute}`

export class ResumeService {
    public static GetResume() {
        return axios.get<ResumeItems>(url, {timeout: AxiosTimeoutInMs});
    }
}