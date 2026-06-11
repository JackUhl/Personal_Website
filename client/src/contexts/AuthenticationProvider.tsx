import { useEffect, useMemo, useState } from "react";
import { useFetch } from "../hooks/useFetch/useFetch";
import { AuthenticationService } from "../services/AuthenticationService";
import { AuthenticationContext } from "./AuthenticationContext";

export const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const serviceCall = useMemo(() => AuthenticationService.GetAuthenticationStatus(), []);
    const { response } = useFetch(serviceCall);

    useEffect(() => {
        if (response?.admin) {
            setIsAdmin(true);
        }
    }, [response])

    return (
        <AuthenticationContext.Provider value={isAdmin}>
            {children}
        </AuthenticationContext.Provider>
    );
};