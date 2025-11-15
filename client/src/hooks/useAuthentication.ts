import { useEffect, useMemo, useState } from "react";
import { useFetch } from "./useFetch";
import { AuthenticationService } from "../services/AuthenticationService";

export function useAuthentication() {
    const [isAdmin, setIsAdmin] = useState(false);
    const serviceCall = useMemo(() => AuthenticationService.GetAuthenticationStatus(), []);
    const fetch = useFetch(serviceCall);

    useEffect(() => {
        if(fetch.response?.admin) {
            setIsAdmin(true);
        }
    }, [fetch.response])

    return isAdmin
}