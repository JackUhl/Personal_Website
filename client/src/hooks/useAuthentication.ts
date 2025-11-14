import { useMemo } from "react";
import { useFetch } from "./useFetch";
import { AuthenticationService } from "../services/AuthenticationService";

export function useAuthentication() {
    const serviceCall = useMemo(() => AuthenticationService.GetAuthenticationStatus(), []);
    const fetch = useFetch(serviceCall);

    if(fetch.response) {
        console.log("Admin status:", fetch.response.admin);
    }
}