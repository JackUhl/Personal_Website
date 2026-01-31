import axios from "axios";
import { AxiosTimeoutInMs } from "../models/constants/ConfigurationConstants";
import { AuthenticationApiRoute } from "../models/constants/RouteConstants";
import { AuthenticationStatus } from "../models/objects/AuthenticationStatus";

const url = `${import.meta.env.VITE_API_URL}${AuthenticationApiRoute}`

export class AuthenticationService {
    public static GetAuthenticationStatus() {
        return axios.get<AuthenticationStatus>(url, {timeout: AxiosTimeoutInMs})
    }
}